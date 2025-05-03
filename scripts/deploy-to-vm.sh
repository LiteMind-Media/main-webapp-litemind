#!/bin/bash

# Configuration for Convex self-hosted on this VM
VM_IP="35.209.122.201"
DATA_PATH="/root/convex-data"
CONVEX_ADMIN_PASSWORD="admin_password"  # Change this to a secure password

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Convex Self-Hosted Deployment ===${NC}"
echo -e "${GREEN}This script will deploy Convex database on this VM${NC}"

# Check for docker and docker-compose
if ! command -v docker &> /dev/null; then
    echo -e "\n${YELLOW}Docker not found. Installing Docker...${NC}"
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "\n${YELLOW}Docker Compose not found. Installing Docker Compose...${NC}"
    curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
fi

# Create directories
echo -e "\n${YELLOW}Creating data directory...${NC}"
mkdir -p $DATA_PATH

# Create a docker-compose file specifically for the Convex deployment
echo -e "\n${YELLOW}Creating Docker Compose file for Convex...${NC}"
cat > docker-compose.yml << EOF
version: "3"

services:
  # Self-hosted Convex
  convex:
    image: ghcr.io/get-convex/convex-backend:latest
    container_name: convex-server
    restart: unless-stopped
    ports:
      - "8000:3210"  # Convex API - maps container port 3210 to host port 8000
      - "8001:3211"  # Admin Dashboard - maps container port 3211 to host port 8001
    environment:
      - CONVEX_ADMIN_USER=admin
      - CONVEX_ADMIN_PASSWORD=${CONVEX_ADMIN_PASSWORD}
      - CONVEX_DASHBOARD_PORT=3211
    volumes:
      - ${DATA_PATH}:/data
EOF

# Stop any existing containers
echo -e "\n${YELLOW}Stopping any existing containers...${NC}"
docker-compose down 2>/dev/null || true

# Pull the latest Convex image
echo -e "\n${YELLOW}Pulling the latest Convex image...${NC}"
docker pull ghcr.io/get-convex/convex-backend:latest

# Start Convex container
echo -e "\n${YELLOW}Starting Convex container...${NC}"
docker-compose up -d

# Check if container is running
if docker ps | grep -q convex-server; then
    echo -e "\n${GREEN}✅ Convex container is running successfully!${NC}"
else
    echo -e "\n${RED}⚠️ Convex container failed to start properly.${NC}"
    echo -e "Check logs with: docker logs convex-server"
    exit 1
fi

# Wait a moment for Convex to initialize
echo -e "\n${YELLOW}Waiting for Convex to initialize (15 seconds)...${NC}"
sleep 15

# Test the connection
echo -e "\n${YELLOW}Testing connection to Convex API...${NC}"
if curl -s --head --request GET http://localhost:8000 | grep "200" > /dev/null; then 
    echo -e "${GREEN}✅ Convex API is accessible locally!${NC}"
    
    # Check if it's accessible from the outside
    if curl -s --head --request GET http://${VM_IP}:8000 | grep "200" > /dev/null; then 
        echo -e "${GREEN}✅ Convex API is accessible externally!${NC}"
    else
        echo -e "${YELLOW}⚠️ Convex API might not be accessible externally. Check firewall settings.${NC}"
    fi
else
    echo -e "${RED}⚠️ Convex API is not responding. Check container logs.${NC}"
    docker logs convex-server
fi

echo -e "\n${GREEN}Deployment completed!${NC}"
echo -e "${GREEN}Your Convex API is available at: http://${VM_IP}:8000${NC}"
echo -e "${GREEN}Your Admin Dashboard is available at: http://${VM_IP}:8001${NC}"
echo -e "${GREEN}Username: admin${NC}"
echo -e "${GREEN}Password: ${CONVEX_ADMIN_PASSWORD}${NC}"

# Instructions for updating your application
echo -e "\n${YELLOW}Next Steps:${NC}"
echo -e "1. Update your application's .env file with the following values:"
echo -e "   NEXT_PUBLIC_CONVEX_URL=http://${VM_IP}:8000"
echo -e "   CONVEX_ADMIN_URL=http://${VM_IP}:8001"
echo -e "   CONVEX_ADMIN_USER=admin"
echo -e "   CONVEX_ADMIN_PASSWORD=${CONVEX_ADMIN_PASSWORD}"
echo -e "   CONVEX_HOST_DOMAIN=${VM_IP}"
echo -e "\n2. Deploy your Convex schema to this self-hosted instance:"
echo -e "   CONVEX_URL=http://${VM_IP}:8000 npx convex deploy"
