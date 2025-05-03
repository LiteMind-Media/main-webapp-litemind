#!/bin/bash

# Clear any existing cloud deployment settings
unset CONVEX_DEPLOYMENT

# Set up environment variables for self-hosted Convex
export CONVEX_URL=http://localhost:8000
export CONVEX_ADMIN_URL=http://localhost:8001
export CONVEX_SELF_HOSTED=1

# Deploy to self-hosted Convex
echo "Deploying to self-hosted Convex at $CONVEX_URL..."
npx convex deploy --self-hosted

echo "Deployment complete!"