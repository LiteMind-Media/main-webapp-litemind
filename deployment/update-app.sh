#!/bin/bash
# Simple script to update the application on the VM
# Usage: ./update-app.sh [branch] (defaults to main if not specified)

BRANCH=${1:-main}
APP_NAME="litemind-webapp"
APP_DIR="/path/to/your/app/directory"  # Update this to your app directory on the VM

echo "Updating $APP_NAME from branch $BRANCH..."

# Navigate to app directory
cd $APP_DIR || { echo "Error: Could not change to app directory"; exit 1; }

# Stash any local changes (if needed)
git stash

# Pull latest changes
git checkout $BRANCH
git pull origin $BRANCH

echo "Installing dependencies..."
pnpm install

echo "Building application..."
pnpm build

echo "Restarting application..."
pm2 restart $APP_NAME

echo "Deployment complete! Current status:"
pm2 status $APP_NAME

echo "Check logs with: pm2 logs $APP_NAME"
