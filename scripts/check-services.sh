#!/bin/bash

# Check Convex service
echo "Checking Convex service..."
curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/health || echo "Convex API is not responding"

# Check Next.js application
echo "Checking Next.js application..."
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 || echo "Next.js application is not responding"

# Check Docker container status
echo "Docker container status:"
docker ps
