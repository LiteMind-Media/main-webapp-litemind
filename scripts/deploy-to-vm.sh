#!/bin/bash

# Configuration
VM_USER="your-vm-username"
VM_IP="your-vm-ip-address"
VM_PATH="/home/$VM_USER/litemind-webapp"

# Create a production .env file
cat > .env.production << EOF
NEXT_PUBLIC_CONVEX_URL=http://localhost:8000
CONVEX_ADMIN_URL=http://localhost:8001
CONVEX_ADMIN_PASSWORD=your_secure_password_here
EOF

# Create a deployment package
echo "Creating deployment package..."
tar --exclude="node_modules" --exclude=".next" --exclude=".git" -czf deploy.tar.gz .

# Copy files to the VM
echo "Copying files to VM..."
scp deploy.tar.gz $VM_USER@$VM_IP:~/ 

# Execute commands on the VM
echo "Setting up on VM..."
ssh $VM_USER@$VM_IP << EOF
  # Extract the application
  mkdir -p $VM_PATH
  tar -xzf deploy.tar.gz -C $VM_PATH
  cd $VM_PATH
  
  # Set up Nginx configuration
  sudo cp nginx.conf /etc/nginx/sites-available/litemind-webapp
  sudo ln -sf /etc/nginx/sites-available/litemind-webapp /etc/nginx/sites-enabled/
  sudo nginx -t && sudo systemctl restart nginx
  
  # Run Docker services
  cd $VM_PATH
  docker-compose down
  docker-compose up -d
EOF

# Clean up
echo "Cleaning up..."
rm deploy.tar.gz

echo "Deployment completed!"
