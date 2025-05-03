#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Starting Development Environment with Self-Hosted Convex ===${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo -e "${RED}Docker isn't running - please start Docker first${NC}"
  exit 1
fi

# Create the convex-data directory if it doesn't exist
mkdir -p convex-data

# Stop the existing container if it exists
echo -e "${YELLOW}Stopping existing Convex container (if any)...${NC}"
docker stop convex-server > /dev/null 2>&1 || true
docker rm convex-server > /dev/null 2>&1 || true

# Start Convex container
echo -e "${YELLOW}Starting Convex server container...${NC}"
docker-compose -f docker-compose.convex.yml up -d

# Check if the container started correctly
if ! docker ps | grep -q convex-server; then
  echo -e "${RED}ERROR: Docker container failed to start${NC}"
  echo -e "${YELLOW}Docker logs:${NC}"
  docker logs convex-server
  exit 1
fi

# Deploy schema immediately without waiting for health check
echo -e "${YELLOW}Deploying schema...${NC}"
if ! CONVEX_URL=http://localhost:8000 CONVEX_ADMIN_URL=http://localhost:8001 npx convex deploy; then
  echo -e "${RED}Failed to deploy schema. Check the error message above.${NC}"
  echo -e "${YELLOW}You can continue with development, but form submissions may not work correctly.${NC}"
else
  echo -e "${GREEN}Schema deployment successful!${NC}"
fi

echo -e "${GREEN}Container started.${NC}"
echo -e "${BLUE}Admin panel available at:${NC} http://localhost:8001"
echo -e "${BLUE}API endpoint available at:${NC} http://localhost:8000"

# Start Next.js development server
echo -e "${GREEN}Starting Next.js development server...${NC}"
npm run dev
