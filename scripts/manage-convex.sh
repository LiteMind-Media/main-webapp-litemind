#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to show usage
show_usage() {
  echo -e "${BLUE}Convex Container Management Script${NC}"
  echo -e "Usage: $0 [command]"
  echo ""
  echo "Commands:"
  echo "  start    - Start the Convex container"
  echo "  stop     - Stop the Convex container"
  echo "  restart  - Restart the Convex container"
  echo "  status   - Show status of the Convex container"
  echo "  logs     - Show logs from the Convex container"
  echo "  deploy   - Deploy schema to Convex"
  echo "  backup   - Backup Convex data"
}

# Check if a command was provided
if [ -z "$1" ]; then
  show_usage
  exit 1
fi

# Check if Docker is running
check_docker() {
  if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Docker isn't running - please start Docker first${NC}"
    exit 1
  fi
}

# Process commands
case "$1" in
  start)
    check_docker
    echo -e "${YELLOW}Starting Convex container...${NC}"
    docker-compose -f docker-compose.convex.yml up -d
    
    echo -e "${YELLOW}Waiting for Convex server to be ready...${NC}"
    until curl -s http://localhost:8000/health > /dev/null; do
      echo -e "${YELLOW}.${NC}"
      sleep 1
    done
    echo -e "${GREEN}Convex server is ready!${NC}"
    echo -e "${GREEN}Admin UI available at: ${NC}http://localhost:8001"
    ;;
  
  stop)
    check_docker
    echo -e "${YELLOW}Stopping Convex container...${NC}"
    docker-compose -f docker-compose.convex.yml down
    echo -e "${GREEN}Convex container stopped${NC}"
    ;;
  
  restart)
    check_docker
    echo -e "${YELLOW}Restarting Convex container...${NC}"
    docker-compose -f docker-compose.convex.yml restart
    
    echo -e "${YELLOW}Waiting for Convex server to be ready...${NC}"
    until curl -s http://localhost:8000/health > /dev/null; do
      echo -e "${YELLOW}.${NC}"
      sleep 1
    done
    echo -e "${GREEN}Convex server is ready!${NC}"
    echo -e "${GREEN}Admin UI available at: ${NC}http://localhost:8001"
    ;;
  
  status)
    check_docker
    echo -e "${YELLOW}Checking Convex container status...${NC}"
    docker ps --filter "name=convex-server" --format "table {{.ID}}\t{{.Status}}\t{{.Ports}}"
    
    # Check if the API is responding
    if curl -s http://localhost:8000/health > /dev/null; then
      echo -e "${GREEN}API is responding at: ${NC}http://localhost:8000"
      echo -e "${GREEN}Admin UI available at: ${NC}http://localhost:8001"
    else
      echo -e "${RED}API is not responding${NC}"
    fi
    ;;
  
  logs)
    check_docker
    echo -e "${YELLOW}Showing Convex container logs...${NC}"
    docker-compose -f docker-compose.convex.yml logs --tail=100 -f
    ;;
  
  deploy)
    check_docker
    if ! docker ps | grep -q convex-server; then
      echo -e "${RED}Convex container is not running. Start it first with: $0 start${NC}"
      exit 1
    fi
    
    echo -e "${YELLOW}Deploying schema to Convex...${NC}"
    CONVEX_URL=http://localhost:8000 CONVEX_ADMIN_URL=http://localhost:8001 npx convex deploy
    echo -e "${GREEN}Schema deployed!${NC}"
    ;;
  
  backup)
    check_docker
    if ! docker ps | grep -q convex-server; then
      echo -e "${RED}Convex container is not running. Start it first with: $0 start${NC}"
      exit 1
    fi
    
    BACKUP_DIR="./convex-backups"
    mkdir -p "$BACKUP_DIR"
    BACKUP_FILE="$BACKUP_DIR/convex-backup-$(date +%Y%m%d-%H%M%S).tar.gz"
    
    echo -e "${YELLOW}Creating backup of Convex data...${NC}"
    tar -czf "$BACKUP_FILE" -C $(dirname "./convex-data") $(basename "./convex-data")
    
    if [ $? -eq 0 ]; then
      echo -e "${GREEN}Backup created successfully: $BACKUP_FILE${NC}"
    else
      echo -e "${RED}Backup failed!${NC}"
      exit 1
    fi
    ;;
  
  *)
    echo -e "${RED}Invalid command: $1${NC}"
    show_usage
    exit 1
    ;;
esac