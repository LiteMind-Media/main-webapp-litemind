#!/bin/bash

# Configuration - Update these values with your actual VM information
VM_USER="your-vm-username"
VM_IP="your-vm-ip-address"
VM_PATH="/home/$VM_USER/litemind-webapp"
CONVEX_ADMIN_PASSWORD="admin_password"  # Change this to a secure password

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== LiteMind Media Cloud Deployment ===${NC}"
echo -e "${GREEN}This script will deploy your application and Convex database to your cloud VM${NC}"

# Create a production .env file with VM-specific values
echo -e "${YELLOW}Creating production environment file...${NC}"
cat > .env.production << EOF
# Self-hosted Convex Configuration
NEXT_PUBLIC_CONVEX_URL=http://${VM_IP}:8000
CONVEX_ADMIN_URL=http://${VM_IP}:8001
CONVEX_ADMIN_USER=admin
CONVEX_ADMIN_PASSWORD=${CONVEX_ADMIN_PASSWORD}
CONVEX_HOST_DOMAIN=${VM_IP}

# Comment out cloud deployment settings to avoid conflicts
# CONVEX_DEPLOYMENT=local:local-litemind_media-litemind_webapp
# CONVEX_DEPLOYMENT=dev:keen-minnow-926
# NEXT_PUBLIC_CONVEX_URL=https://keen-minnow-926.convex.cloud
EOF

# Create a docker-compose file specifically for the VM deployment
echo -e "${YELLOW}Creating Docker Compose file for VM...${NC}"
cat > docker-compose.vm.yml << EOF
version: "3"

services:
  # Next.js application
  webapp:
    build: .
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_CONVEX_URL=http://${VM_IP}:8000
    depends_on:
      - convex

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
      - ./convex-data:/data
EOF

# Create a deployment package excluding unnecessary files
echo -e "${YELLOW}Creating deployment package...${NC}"
tar --exclude="node_modules" --exclude=".next" --exclude=".git" --exclude="convex-data" -czf deploy.tar.gz .

# Copy files to the VM
echo -e "${YELLOW}Copying files to VM at ${VM_IP}...${NC}"
scp deploy.tar.gz $VM_USER@$VM_IP:~/ 

# Create a remote setup script
cat > remote-setup.sh << EOF
#!/bin/bash

# Extract the application
mkdir -p $VM_PATH
tar -xzf ~/deploy.tar.gz -C $VM_PATH
cd $VM_PATH

# Move docker-compose.vm.yml to docker-compose.yml
mv docker-compose.vm.yml docker-compose.yml

# Set up Nginx configuration
if [ -d /etc/nginx/sites-available ]; then
  sudo cp nginx.conf /etc/nginx/sites-available/litemind-webapp
  sudo ln -sf /etc/nginx/sites-available/litemind-webapp /etc/nginx/sites-enabled/
  sudo nginx -t && sudo systemctl restart nginx
else
  echo "Nginx sites-available directory not found. Please configure Nginx manually."
fi

# Create necessary directories
mkdir -p $VM_PATH/convex-data

# Stop any existing containers
docker-compose down

# Build and start containers
docker-compose up -d

# Wait for Convex to be available
echo "Waiting for Convex to start up (30 seconds)..."
sleep 30

# Deploy Convex schema
cd $VM_PATH
CONVEX_URL=http://localhost:8000 npx convex deploy

echo "Deployment complete! You can access:"
echo "- Website: http://${VM_IP}:3000"
echo "- Convex API: http://${VM_IP}:8000"
echo "- Admin Dashboard: http://${VM_IP}:8001"
EOF

# Copy and execute remote setup script
scp remote-setup.sh $VM_USER@$VM_IP:~/
ssh $VM_USER@$VM_IP "chmod +x ~/remote-setup.sh && ~/remote-setup.sh"

# Clean up local files
echo -e "${YELLOW}Cleaning up local files...${NC}"
rm deploy.tar.gz remote-setup.sh

echo -e "${GREEN}Deployment completed!${NC}"
echo -e "${GREEN}Your application is now available at: http://${VM_IP}:3000${NC}"
echo -e "${GREEN}Your Convex API is available at: http://${VM_IP}:8000${NC}"
echo -e "${GREEN}Your Admin Dashboard is available at: http://${VM_IP}:8001${NC}"
echo -e "${YELLOW}NOTE: If this is your first deployment, you may need to wait a few minutes for everything to initialize.${NC}"
