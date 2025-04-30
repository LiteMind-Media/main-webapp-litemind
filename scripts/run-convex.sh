#!/bin/bash

# Convenience script to run Docker Compose commands safely

# Set the directory of this script as the working directory
cd "$(dirname "$0")/.."

# Determine which docker-compose command to use
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
elif command -v docker &> /dev/null && docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    echo "Neither docker-compose nor docker compose is available."
    echo "Please run the fix-docker-compose.sh script first."
    exit 1
fi

# Check if docker-compose.yml exists
if [ ! -f "docker-compose.yml" ]; then
    echo "Error: docker-compose.yml not found in the current directory."
    exit 1
fi

# Parse command line arguments
ACTION=${1:-"up"}

case $ACTION in
    up)
        echo "Starting Docker containers..."
        $DOCKER_COMPOSE up -d
        ;;
    down)
        echo "Stopping Docker containers..."
        $DOCKER_COMPOSE down
        ;;
    restart)
        echo "Restarting Docker containers..."
        $DOCKER_COMPOSE restart
        ;;
    logs)
        echo "Showing container logs..."
        $DOCKER_COMPOSE logs -f
        ;;
    status)
        echo "Container status:"
        $DOCKER_COMPOSE ps
        ;;
    *)
        echo "Unknown command: $ACTION"
        echo "Usage: $0 [up|down|restart|logs|status]"
        exit 1
        ;;
esac

echo "Done."
