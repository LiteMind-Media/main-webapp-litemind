#!/bin/bash

# Stop the existing Convex container
echo "Stopping existing Convex container..."
docker stop convex-server || true
docker rm convex-server || true

# Start a new Convex container
echo "Starting new Convex container..."
docker-compose -f docker-compose.convex.yml up -d

# Check if the container started correctly
if ! docker ps | grep -q convex-server; then
  echo "ERROR: Docker container failed to start"
  echo "Docker logs:"
  docker logs convex-server
  exit 1
fi

echo "Container started. Deploying schema immediately..."

# Deploy schema immediately without waiting for health check
echo "Deploying schema..."
CONVEX_URL=http://localhost:8000 CONVEX_ADMIN_URL=http://localhost:8001 npx convex deploy

echo "Done! Your Convex database should be ready."
echo "You can check the status with: curl http://localhost:8000/health"
echo "Admin dashboard available at: http://localhost:8001"