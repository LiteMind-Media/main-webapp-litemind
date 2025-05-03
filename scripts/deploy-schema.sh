#!/bin/bash

# Configuration
VM_IP="35.209.122.201"
CONVEX_URL="http://${VM_IP}:8000"

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Convex Schema Deployment ===${NC}"
echo -e "${GREEN}This script will deploy your Convex schema to your self-hosted instance${NC}"

# Check if the Convex API is responding
echo -e "\n${YELLOW}Checking if Convex API is accessible...${NC}"
if curl -s --head --request GET $CONVEX_URL | grep "200" > /dev/null; then 
    echo -e "${GREEN}✓ Convex API is accessible at ${CONVEX_URL}${NC}"
else
    echo -e "${RED}Error: Cannot connect to Convex API at ${CONVEX_URL}${NC}"
    echo -e "${YELLOW}Make sure Convex is running and accessible.${NC}"
    exit 1
fi

# Deploy the schema
echo -e "\n${YELLOW}Deploying Convex schema...${NC}"
CONVEX_URL=$CONVEX_URL npx convex deploy

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}Schema deployed successfully!${NC}"
else
    echo -e "\n${RED}Error: Failed to deploy schema.${NC}"
    exit 1
fi

echo -e "\n${GREEN}Your application is now connected to your self-hosted Convex database.${NC}"
echo -e "${YELLOW}To configure your local development environment:${NC}"
echo -e "1. Update your .env file with:"
echo -e "   NEXT_PUBLIC_CONVEX_URL=${CONVEX_URL}"
echo -e "2. Restart your development server."