#!/bin/bash

# Configuration
VM_IP="35.209.122.201"
CONVEX_URL="http://${VM_IP}:8000"

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Development with Self-Hosted Convex ===${NC}"
echo -e "${GREEN}This script will run your application with your self-hosted Convex instance${NC}"

# Check if Convex is running
echo -e "\n${YELLOW}Checking if Convex API is accessible...${NC}"
if curl -s --head --request GET $CONVEX_URL | grep "200" > /dev/null; then 
    echo -e "${GREEN}✓ Convex API is accessible at ${CONVEX_URL}${NC}"
else
    echo -e "${RED}Error: Cannot connect to Convex API at ${CONVEX_URL}${NC}"
    echo -e "${YELLOW}Make sure your self-hosted Convex is running and accessible.${NC}"
    exit 1
fi

# Create or update .env.local file with Convex configuration
echo -e "\n${YELLOW}Setting up environment variables...${NC}"
cat > .env.local << EOF
NEXT_PUBLIC_CONVEX_URL=${CONVEX_URL}
EOF

echo -e "${GREEN}Environment variables set successfully!${NC}"

# Start development server
echo -e "\n${YELLOW}Starting development server with self-hosted Convex...${NC}"
echo -e "${GREEN}Your app will use the Convex instance at ${CONVEX_URL}${NC}"

# Run next dev with the environment variable
NEXT_PUBLIC_CONVEX_URL=$CONVEX_URL npm run dev