#!/bin/bash

# LiteMind Media Google Cloud VM Deployment Script
# This script pulls the latest changes from GitHub and deploys the application

# Text styling for better output
BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Display script banner
echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  LiteMind Media Google Cloud Deployment Tool    ${NC}"
echo -e "${BLUE}================================================${NC}"

# Configuration - MODIFY THESE VALUES
REPO_URL="https://github.com/yourusername/litemind-webapp.git"
APP_DIR="/home/$(whoami)/litemind-webapp"
DOMAIN_NAME="yourdomain.com" # Your actual domain name

# Step 1: Check if app directory exists
if [ ! -d "$APP_DIR" ]; then
  echo -e "${YELLOW}App directory doesn't exist. Creating and cloning repository...${NC}"
  mkdir -p "$APP_DIR"
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
else
  echo -e "${YELLOW}App directory exists. Pulling latest changes...${NC}"
  cd "$APP_DIR"
  
  # Stash any local changes if needed
  git stash
  
  # Pull latest changes
  git pull
fi

# Step 2: Create/update the environment file for production
echo -e "${YELLOW}Setting up environment variables...${NC}"

cat > .env.local << EOF
# Production environment settings
NEXT_PUBLIC_CONVEX_URL=http://localhost:8000
CONVEX_ADMIN_URL=http://localhost:8001
CONVEX_ADMIN_PASSWORD=$(openssl rand -base64 12)
CONVEX_HOST_DOMAIN=$DOMAIN_NAME
NODE_ENV=production
EOF

echo -e "${GREEN}Environment variables set up successfully.${NC}"

# Step 3: Update the nginx configuration
echo -e "${YELLOW}Updating Nginx configuration...${NC}"

sudo cat > /etc/nginx/sites-available/litemind-webapp << EOF
server {
    listen 80;
    server_name $DOMAIN_NAME www.$DOMAIN_NAME;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    location /api/convex/ {
        rewrite ^/api/convex(/.*)$ \$1 break;
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    location /admin/convex/ {
        rewrite ^/admin/convex(/.*)$ \$1 break;
        proxy_pass http://127.0.0.1:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/litemind-webapp /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

echo -e "${GREEN}Nginx configuration updated successfully.${NC}"

# Step 4: Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"

# Ensure Node.js and PNPM are installed
if ! [ -x "$(command -v node)" ]; then
  echo -e "${YELLOW}Installing Node.js...${NC}"
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt install -y nodejs
fi

if ! [ -x "$(command -v pnpm)" ]; then
  echo -e "${YELLOW}Installing PNPM...${NC}"
  npm install -g pnpm
fi

# Install project dependencies
pnpm install
echo -e "${GREEN}Dependencies installed successfully.${NC}"

# Step 5: Build the Next.js application
echo -e "${YELLOW}Building the Next.js application...${NC}"
pnpm build
echo -e "${GREEN}Application built successfully.${NC}"

# Step 6: Ensure Docker is installed and running
echo -e "${YELLOW}Checking Docker installation...${NC}"
if ! [ -x "$(command -v docker)" ]; then
  echo -e "${YELLOW}Installing Docker...${NC}"
  curl -fsSL https://get.docker.com | sudo sh
  sudo usermod -aG docker $(whoami)
  
  echo -e "${RED}Please log out and log back in for Docker permissions to take effect.${NC}"
  exit 1
fi

if ! [ -x "$(command -v docker-compose)" ]; then
  echo -e "${YELLOW}Installing Docker Compose...${NC}"
  sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
fi

# Step 7: Start the services using Docker Compose
echo -e "${YELLOW}Starting services with Docker Compose...${NC}"
docker-compose down
docker-compose up -d
echo -e "${GREEN}Services started successfully.${NC}"

# Step 8: Deploy Convex schema to the local instance
echo -e "${YELLOW}Deploying Convex schema...${NC}"
npx convex deploy --url=http://localhost:8000 --admin=http://localhost:8001
echo -e "${GREEN}Convex schema deployed successfully.${NC}"

# Step 9: Set up PM2 to manage the Next.js process
echo -e "${YELLOW}Setting up PM2 process manager...${NC}"
if ! [ -x "$(command -v pm2)" ]; then
  npm install -g pm2
fi

pm2 delete litemind-webapp 2>/dev/null || true
pm2 start npm --name "litemind-webapp" -- start
pm2 save
pm2 startup

echo -e "${GREEN}PM2 process manager configured successfully.${NC}"

# Step 10: Final verification
echo -e "${YELLOW}Verifying services...${NC}"
if curl -s localhost:3000 > /dev/null && curl -s localhost:8000/api/health > /dev/null; then
  echo -e "${GREEN}All services are running correctly!${NC}"
else
  echo -e "${RED}Service verification failed. Please check the logs.${NC}"
fi

echo -e "\n${BLUE}=== Deployment Summary ===${NC}"
echo -e "Next.js App: ${GREEN}http://$DOMAIN_NAME${NC}"
echo -e "Convex Admin: ${GREEN}http://$DOMAIN_NAME/admin/convex${NC}"
echo -e "Convex API: ${GREEN}http://$DOMAIN_NAME/api/convex${NC}"
echo -e "\n${BLUE}=== Logs Access ===${NC}"
echo -e "Next.js Logs: ${YELLOW}pm2 logs litemind-webapp${NC}"
echo -e "Docker Logs: ${YELLOW}docker-compose logs -f${NC}"
echo -e "\n${GREEN}Deployment completed successfully!${NC}"
echo -e "${BLUE}================================================${NC}"
