#!/bin/bash

# Function to display error message and exit
die() {
    echo "$1" >&2
    exit 1
}

# Function to handle cleanup
cleanup() {
    echo "Cleaning up..."
    docker compose down
    exit 0
}

# Trap SIGINT (Ctrl+C) and call cleanup function
trap cleanup SIGINT

# Build Docker Compose images
echo "Building Docker Compose images..."
docker compose build || die "Failed to build Docker images."

# Run Docker Compose containers in detached mode
echo "Running Docker Compose containers..."
docker compose up -d || die "Failed to start Docker containers."

# Wait for termination
echo "Press Ctrl+C to stop the containers and exit."

# Keep the script running
while true; do
    sleep 1
done
