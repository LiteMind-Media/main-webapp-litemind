#!/bin/bash

# Script to fix "docker-compose: command not found" issues
echo "Fixing Docker Compose installation..."

# Check if Docker is installed
if ! [ -x "$(command -v docker)" ]; then
  echo "Docker is not installed. Please run the cloud-server-setup.sh script first."
  exit 1
fi

# Remove any existing Docker Compose installations
sudo rm -f /usr/local/bin/docker-compose

# Install the Docker Compose binary
echo "Installing Docker Compose binary..."
LATEST_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
sudo curl -L "https://github.com/docker/compose/releases/download/${LATEST_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install the Docker Compose plugin (newer approach)
echo "Installing Docker Compose plugin..."
sudo apt-get update
sudo apt-get install -y docker-compose-plugin

# Create symbolic links for compatibility
echo "Setting up symbolic links..."
sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose

# Update your PATH
echo 'export PATH=$PATH:/usr/local/bin' >> ~/.bashrc
source ~/.bashrc

# Verify installation
echo "Verifying Docker Compose installation:"
docker-compose --version || docker compose version

echo "If Docker Compose is still not found, please log out and log back in to update your PATH."
echo "Alternatively, you can try running: source ~/.bashrc"
