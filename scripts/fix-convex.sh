#!/bin/bash

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== LiteMind Media Convex Dashboard Setup ===${NC}"
echo -e "${YELLOW}This script will fix your Convex setup and provide access to the admin dashboard${NC}"

# Step 1: Stop any existing Convex containers
echo -e "\n${YELLOW}Step 1: Stopping any running Convex containers...${NC}"
docker stop convex-server 2>/dev/null || true
docker rm convex-server 2>/dev/null || true
echo -e "${GREEN}✓ Cleaned up any existing containers${NC}"

# Step 2: Update the docker-compose.convex.yml file with correct settings
echo -e "\n${YELLOW}Step 2: Updating Convex Docker configuration...${NC}"
cat > docker-compose.convex.yml << EOL
version: "3.8"

services:
  convex:
    image: ghcr.io/get-convex/convex-backend:latest
    container_name: convex-server
    ports:
      - "8000:3210"       # API endpoint
      - "8001:8001"       # Admin dashboard 
    environment:
      - CONVEX_ADMIN_PASSWORD=admin_password_here
      - CONVEX_ADMIN_PATH=/dashboard
    volumes:
      - ./convex-data:/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3210/health"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 10s
    command: [
      "--admin-path", "/dashboard",
      "--admin-port", "8001"
    ]
EOL
echo -e "${GREEN}✓ Updated docker-compose.convex.yml${NC}"

# Step 3: Update convex.json to use self-hosted mode correctly
echo -e "\n${YELLOW}Step 3: Configuring convex.json for self-hosted mode...${NC}"
cat > convex.json << EOL
{
  "selfHosted": true,
  "url": "http://localhost:8000",
  "admin": "http://localhost:8001/dashboard",
  "project": "litemind-media"
}
EOL
echo -e "${GREEN}✓ Updated convex.json${NC}"

# Step 4: Update .env.local with correct environment variables
echo -e "\n${YELLOW}Step 4: Updating environment variables...${NC}"
# Create backup of original .env.local
cp .env.local .env.local.backup 2>/dev/null || true
cat > .env.local << EOL
# Self-hosted Convex Configuration
NEXT_PUBLIC_CONVEX_URL=http://localhost:8000
CONVEX_ADMIN_URL=http://localhost:8001/dashboard
CONVEX_ADMIN_PASSWORD=admin_password_here
CONVEX_HOST_DOMAIN=localhost

# Comment out cloud deployment settings to avoid conflicts
# CONVEX_DEPLOYMENT=local:local-litemind_media-litemind_webapp
# CONVEX_DEPLOYMENT=dev:keen-minnow-926
# NEXT_PUBLIC_CONVEX_URL=https://keen-minnow-926.convex.cloud
EOL
echo -e "${GREEN}✓ Updated .env.local${NC}"

# Step 5: Start the Convex container
echo -e "\n${YELLOW}Step 5: Starting Convex container...${NC}"
docker-compose -f docker-compose.convex.yml up -d
echo -e "${GREEN}✓ Started Convex container${NC}"

# Step 6: Wait for Convex to be fully up and running
echo -e "\n${YELLOW}Step 6: Waiting for Convex to be ready...${NC}"
echo -e "${YELLOW}This may take up to 30 seconds...${NC}"
for i in {1..15}; do
  if curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/health | grep -q "200"; then
    echo -e "${GREEN}✓ Convex API is ready!${NC}"
    break
  fi
  sleep 2
  echo -n "."
done

# Final instructions
echo -e "\n${BLUE}=== Convex Dashboard Access ===${NC}"
echo -e "${GREEN}Your Convex setup is now complete!${NC}"
echo -e "\n${YELLOW}To access your admin dashboard:${NC}"
echo -e "1. Open your browser and navigate to: ${BLUE}http://localhost:8001/dashboard${NC}"
echo -e "   Username: admin"
echo -e "   Password: admin_password_here (or the value set in your docker-compose file)"
echo -e "\n${YELLOW}To access your Convex API:${NC}"
echo -e "   API URL: ${BLUE}http://localhost:8000${NC}"
echo -e "\n${YELLOW}To deploy your schema:${NC}"
echo -e "   Run: ${BLUE}CONVEX_URL=http://localhost:8000 npx convex deploy --self-hosted${NC}"
echo -e "\n${YELLOW}To check container status:${NC}"
echo -e "   Run: ${BLUE}docker ps | grep convex-server${NC}"
echo -e ""