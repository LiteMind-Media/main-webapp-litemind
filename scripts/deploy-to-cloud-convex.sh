#!/bin/bash

# Deploy schema to Convex cloud
echo "Deploying to Convex cloud..."

# Check if CONVEX_DEPLOYMENT is available in .env.local
if grep -q "CONVEX_DEPLOYMENT" .env.local; then
  # Use the deployment from .env.local
  npx convex deploy
else
  # If no specific deployment set, ask for interactive selection
  npx convex deploy
fi

echo "Deployment to Convex cloud completed successfully!"