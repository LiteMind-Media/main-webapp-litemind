#!/bin/bash

# Ensure we're in the project root
cd "$(dirname "$0")/.."

# Set the Convex URL from environment or use the default
CONVEX_URL=${CONVEX_URL:-"http://your_vm_ip_or_domain:8000"}
CONVEX_ADMIN_URL=${CONVEX_ADMIN_URL:-"http://your_vm_ip_or_domain:8001"}

echo "Deploying to self-hosted Convex instance..."
echo "API URL: $CONVEX_URL"
echo "Admin URL: $CONVEX_ADMIN_URL"

# Deploy Convex functions
npx convex deploy --url=$CONVEX_URL --admin=$CONVEX_ADMIN_URL

echo "Deployment completed!"
