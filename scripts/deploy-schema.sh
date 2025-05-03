#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Deploying Schema to Self-Hosted Convex ===${NC}"

# Use environment variables if set, otherwise use defaults
CONVEX_URL=${CONVEX_URL:-http://localhost:8000}
CONVEX_ADMIN_URL=${CONVEX_ADMIN_URL:-http://localhost:8001}

# Check if the Convex API is responding
echo -e "${YELLOW}Checking if Convex API is available at ${CONVEX_URL}...${NC}"
if ! curl -s -o /dev/null -w "%{http_code}" "${CONVEX_URL}/health" | grep -q "200"; then
  echo -e "${RED}ERROR: Convex API is not responding at ${CONVEX_URL}/health${NC}"
  echo -e "${YELLOW}Make sure the Convex Docker container is running:${NC}"
  echo -e "  docker-compose -f docker-compose.convex.yml up -d"
  exit 1
fi

echo -e "${GREEN}Convex API is available!${NC}"

# Deploy the schema
echo -e "${YELLOW}Deploying schema...${NC}"
CONVEX_URL=${CONVEX_URL} CONVEX_ADMIN_URL=${CONVEX_ADMIN_URL} npx convex deploy

echo -e "${GREEN}Schema deployment complete!${NC}"
echo -e "${BLUE}Convex admin dashboard should be available at:${NC} ${CONVEX_ADMIN_URL}/dashboard"
echo -e "${BLUE}API endpoint available at:${NC} ${CONVEX_URL}"