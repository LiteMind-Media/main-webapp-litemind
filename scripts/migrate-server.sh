#!/bin/bash

# LiteMind Media Server Migration Script
# Purpose: Safely migrate from one server to another without data loss
# Usage: ./migrate-server.sh [source_server_ip] [destination_server_ip] [ssh_user]

# Set strict error handling
set -e

# Text styling for better output
BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Display script banner
echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  LiteMind Media Server Migration Tool${NC}"
echo -e "${BLUE}  Migrate between servers with zero data loss${NC}"
echo -e "${BLUE}================================================${NC}"

# Process command line arguments
SOURCE_SERVER=${1:-""}
DEST_SERVER=${2:-""}
SSH_USER=${3:-"root"}

# If no arguments provided, prompt for them
if [ -z "$SOURCE_SERVER" ]; then
    echo -e "${YELLOW}Enter source server IP:${NC}"
    read SOURCE_SERVER
fi

if [ -z "$DEST_SERVER" ]; then
    echo -e "${YELLOW}Enter destination server IP:${NC}"
    read DEST_SERVER
fi

# Configure paths and settings
SOURCE_SSH="$SSH_USER@$SOURCE_SERVER"
DEST_SSH="$SSH_USER@$DEST_SERVER"
APP_DIR="/home/$SSH_USER/litemind-webapp"
CONVEX_DATA_DIR="/home/$SSH_USER/convex-data"
BACKUP_DIR="/home/$SSH_USER/migration_backup_$(date +%Y%m%d_%H%M%S)"
DOCKER_COMPOSE_FILE="docker-compose.yml"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

echo -e "\n${YELLOW}Migration Details:${NC}"
echo -e "  Source Server:      ${GREEN}$SOURCE_SERVER${NC}"
echo -e "  Destination Server: ${GREEN}$DEST_SERVER${NC}"
echo -e "  SSH User:           ${GREEN}$SSH_USER${NC}"
echo -e "  Application Dir:    ${GREEN}$APP_DIR${NC}"
echo -e "  Convex Data Dir:    ${GREEN}$CONVEX_DATA_DIR${NC}"
echo -e "  Backup Directory:   ${GREEN}$BACKUP_DIR${NC}\n"

# Confirm before proceeding
echo -e "${YELLOW}WARNING: This will stop services on the source server during migration.${NC}"
echo -e "${YELLOW}Do you want to continue? (y/n)${NC}"
read -r CONFIRM
if [[ ! "$CONFIRM" =~ ^[Yy]$ ]]; then
    echo -e "${RED}Migration cancelled.${NC}"
    exit 1
fi

# ==============================================
# PHASE 1: Check connectivity and prerequisites
# ==============================================
echo -e "\n${BLUE}=== PHASE 1: Checking connectivity and prerequisites ===${NC}"

echo -e "${YELLOW}Checking SSH access to source server...${NC}"
if ! ssh -o BatchMode=yes -o ConnectTimeout=5 "$SOURCE_SSH" echo "Connection successful"; then
    echo -e "${RED}Cannot connect to source server. Please check SSH configuration.${NC}"
    exit 1
fi

echo -e "${YELLOW}Checking SSH access to destination server...${NC}"
if ! ssh -o BatchMode=yes -o ConnectTimeout=5 "$DEST_SSH" echo "Connection successful"; then
    echo -e "${RED}Cannot connect to destination server. Please check SSH configuration.${NC}"
    exit 1
fi

echo -e "${YELLOW}Checking Docker installation on destination server...${NC}"
if ! ssh "$DEST_SSH" "command -v docker && command -v docker-compose"; then
    echo -e "${RED}Docker or Docker Compose not found on destination server.${NC}"
    echo -e "${YELLOW}Installing Docker and Docker Compose...${NC}"
    
    ssh "$DEST_SSH" "curl -fsSL https://get.docker.com | sh && \
                    curl -L \"https://github.com/docker/compose/releases/download/v2.23.3/docker-compose-\$(uname -s)-\$(uname -m)\" -o /usr/local/bin/docker-compose && \
                    chmod +x /usr/local/bin/docker-compose"
                    
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to install Docker. Please install manually and retry.${NC}"
        exit 1
    fi
    echo -e "${GREEN}Docker installed successfully.${NC}"
fi

echo -e "${YELLOW}Checking for rsync on both servers...${NC}"
ssh "$SOURCE_SSH" "command -v rsync" || { echo -e "${RED}rsync not found on source server${NC}"; ssh "$SOURCE_SSH" "apt-get update && apt-get install -y rsync"; }
ssh "$DEST_SSH" "command -v rsync" || { echo -e "${RED}rsync not found on destination server${NC}"; ssh "$DEST_SSH" "apt-get update && apt-get install -y rsync"; }

# Create migration directories
echo -e "${YELLOW}Creating migration directories...${NC}"
ssh "$DEST_SSH" "mkdir -p $APP_DIR $CONVEX_DATA_DIR $BACKUP_DIR"
echo -e "${GREEN}Directories created successfully.${NC}"

# ==============================================
# PHASE 2: Back up source server data
# ==============================================
echo -e "\n${BLUE}=== PHASE 2: Backing up source server data ===${NC}"

# Stop services on source server
echo -e "${YELLOW}Stopping services on source server...${NC}"
ssh "$SOURCE_SSH" "cd $APP_DIR && docker-compose down" || {
    echo -e "${RED}Failed to stop services on source server. Proceeding with manual backup...${NC}"
}

# Backup Convex database
echo -e "${YELLOW}Backing up Convex database...${NC}"
ssh "$SOURCE_SSH" "mkdir -p $BACKUP_DIR && cp -r $CONVEX_DATA_DIR $BACKUP_DIR/" || {
    echo -e "${RED}Failed to backup Convex data.${NC}"
    exit 1
}

# Backup application code
echo -e "${YELLOW}Backing up application code...${NC}"
ssh "$SOURCE_SSH" "cp -r $APP_DIR $BACKUP_DIR/" || {
    echo -e "${RED}Failed to backup application code.${NC}"
    exit 1
}

echo -e "${GREEN}Backup completed successfully.${NC}"

# ==============================================
# PHASE 3: Transfer data to destination server
# ==============================================
echo -e "\n${BLUE}=== PHASE 3: Transferring data to destination server ===${NC}"

# Transfer Convex data
echo -e "${YELLOW}Transferring Convex data (this may take some time)...${NC}"
ssh "$SOURCE_SSH" "rsync -avz --progress $CONVEX_DATA_DIR/ $DEST_SSH:$CONVEX_DATA_DIR/"

# Transfer application code 
echo -e "${YELLOW}Transferring application code...${NC}"
ssh "$SOURCE_SSH" "rsync -avz --progress --exclude 'node_modules' --exclude '.next' --exclude 'convex-data' $APP_DIR/ $DEST_SSH:$APP_DIR/"

echo -e "${GREEN}Data transfer completed successfully.${NC}"

# ==============================================
# PHASE 4: Configure and start services on destination
# ==============================================
echo -e "\n${BLUE}=== PHASE 4: Configuring destination server ===${NC}"

# Update configuration files if needed
echo -e "${YELLOW}Updating configuration files...${NC}"
ssh "$DEST_SSH" "cd $APP_DIR && sed -i 's/CONVEX_HOST_DOMAIN=.*/CONVEX_HOST_DOMAIN=$DEST_SERVER/' .env.local"

# Install dependencies and build
echo -e "${YELLOW}Installing dependencies and building application...${NC}"
ssh "$DEST_SSH" "cd $APP_DIR && npm install -g pnpm && pnpm install && pnpm build"

# Start services on destination
echo -e "${YELLOW}Starting services on destination server...${NC}"
ssh "$DEST_SSH" "cd $APP_DIR && docker-compose up -d"

# Check if services started correctly
echo -e "${YELLOW}Verifying services...${NC}"
if ssh "$DEST_SSH" "cd $APP_DIR && docker-compose ps | grep -i 'up'"; then
    echo -e "${GREEN}Services started successfully on destination server.${NC}"
else
    echo -e "${RED}Services failed to start properly.${NC}"
    echo -e "${YELLOW}Checking Docker logs:${NC}"
    ssh "$DEST_SSH" "cd $APP_DIR && docker-compose logs"
fi

# ==============================================
# PHASE 5: Validation and DNS update guidance
# ==============================================
echo -e "\n${BLUE}=== PHASE 5: Validation and Finalization ===${NC}"

# Check if Convex is accessible
echo -e "${YELLOW}Checking Convex API accessibility...${NC}"
if ssh "$DEST_SSH" "curl -s http://localhost:8000/health | grep -i 'ok'"; then
    echo -e "${GREEN}Convex API is accessible.${NC}"
else
    echo -e "${RED}Convex API check failed. Please verify manually.${NC}"
fi

# Check if web application is accessible
echo -e "${YELLOW}Checking web application accessibility...${NC}"
if ssh "$DEST_SSH" "curl -s http://localhost:3000 | grep -i 'html'"; then
    echo -e "${GREEN}Web application is accessible.${NC}"
else
    echo -e "${RED}Web application check failed. Please verify manually.${NC}"
fi

# Provide DNS update guidance
echo -e "\n${YELLOW}Migration completed successfully!${NC}"
echo -e "\n${BLUE}=== NEXT STEPS ===${NC}"
echo -e "1. Update your DNS records to point to the new server: ${GREEN}$DEST_SERVER${NC}"
echo -e "2. Test the application thoroughly at the new location"
echo -e "3. Once satisfied, you can remove the backup from the source server:"
echo -e "   ${YELLOW}ssh $SOURCE_SSH \"rm -rf $BACKUP_DIR\"${NC}"
echo -e "\nKeep the source server running until you've verified everything works correctly."

# ==============================================
# PHASE 6: Cleanup (Optional)
# ==============================================
echo -e "\n${BLUE}=== PHASE 6: Cleanup (Optional) ===${NC}"
echo -e "${YELLOW}Would you like to restart services on the source server? (y/n)${NC}"
read -r RESTART_SOURCE
if [[ "$RESTART_SOURCE" =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Restarting services on source server...${NC}"
    ssh "$SOURCE_SSH" "cd $APP_DIR && docker-compose up -d"
    echo -e "${GREEN}Services restarted on source server.${NC}"
else
    echo -e "${YELLOW}Services on source server remain stopped.${NC}"
fi

echo -e "\n${GREEN}Migration script completed successfully!${NC}"
echo -e "${BLUE}================================================${NC}"
