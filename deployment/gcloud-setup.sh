#!/bin/bash

# Google Cloud VM setup script for Next.js app
# Make executable with: chmod +x gcloud-setup.sh

echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

echo "Installing PNPM..."
npm install -g pnpm

echo "Installing PM2..."
npm install -g pm2

echo "Installing NGINX..."
sudo apt install -y nginx

echo "Setting up NGINX configuration..."
sudo tee /etc/nginx/sites-available/nextjs <<EOF
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

echo "Enabling NGINX configuration..."
sudo ln -s /etc/nginx/sites-available/nextjs /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx

echo "Cloning application repository..."
# Replace with your repository URL
# git clone https://github.com/yourusername/litemind-webapp.git
# cd litemind-webapp

echo "Installing dependencies..."
# pnpm install

echo "Building application..."
# pnpm build

echo "Starting application with PM2..."
# pm2 start "pnpm start" --name "litemind-webapp"
# pm2 startup
# pm2 save

echo "Setup complete!"
echo "Your Next.js application should now be accessible via your VM's IP address"
