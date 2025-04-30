#!/bin/bash

# Start the development server with Convex
echo "Starting development server with self-hosted Convex..."

# Set environment variables for local development
export NEXT_PUBLIC_CONVEX_URL="http://localhost:8000"
export CONVEX_ADMIN_URL="http://localhost:8001"

# Start the Next.js app
npx next dev
