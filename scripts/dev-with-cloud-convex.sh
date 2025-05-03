#!/bin/bash

# Start development with cloud Convex
echo "Starting development with cloud-hosted Convex..."

# Launch Convex dev watcher in background
npx convex dev &
CONVEX_PID=$!

# Launch Next.js dev server
npm run dev

# When Next.js terminates, also kill Convex watcher
kill $CONVEX_PID