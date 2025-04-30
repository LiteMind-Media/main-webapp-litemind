#!/bin/bash

# Update package lists
sudo apt update
sudo apt upgrade -y

# Install Docker if not already installed
if ! [ -x "$(command -v docker)" ]; then
  echo 'Installing Docker...'
  sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
  sudo apt update
  sudo apt install -y docker-ce
  sudo usermod -aG docker ${USER}
  # Important: inform the user they might need to log out and back in
  echo "NOTE: You may need to log out and log back in for docker group changes to take effect"
fi

# Install Docker Compose using the recommended approach for recent versions
# This avoids the "docker-compose: command not found" error
echo 'Installing Docker Compose...'
# Remove any existing docker-compose installations
sudo rm -f /usr/local/bin/docker-compose

# Install the latest Docker Compose version
LATEST_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
sudo curl -L "https://github.com/docker/compose/releases/download/${LATEST_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Alternative method using the docker compose plugin (newer approach)
echo 'Installing Docker Compose plugin as backup...'
sudo apt-get update
sudo apt-get install -y docker-compose-plugin

# Verify installations
echo "Verifying Docker installation:"
docker --version
echo "Verifying Docker Compose installation:"
docker-compose --version || docker compose version

# Install Node.js for the Next.js app
if ! [ -x "$(command -v node)" ]; then
  echo 'Installing Node.js...'
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt install -y nodejs
  
  # Install PNPM (used by your project)
  npm install -g pnpm
fi

# Install Nginx as a reverse proxy
if ! [ -x "$(command -v nginx)" ]; then
  echo 'Installing Nginx...'
  sudo apt install -y nginx
  
  # Enable Nginx to start at boot
  sudo systemctl enable nginx
fi

# Create directories for applications
mkdir -p ~/convex-selfhosted
mkdir -p ~/litemind-webapp

echo "Server preparation completed successfully!"
