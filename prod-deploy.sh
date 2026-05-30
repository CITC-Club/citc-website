#!/bin/bash

# Exit on any error
set -e

# Load environment variables from .env file
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo "Error: .env file not found. Please create it first."
  exit 1
fi

# Check for required GHCR login variables
if [ -n "$GHCR_TOKEN" ] && [ -n "$GHCR_USER" ]; then
  echo "Logging into GitHub Container Registry (GHCR)..."
  echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USER" --password-stdin
else
  echo "Error: GHCR_USER or GHCR_TOKEN is not defined in .env."
  exit 1
fi

# Pull the latest image from GHCR
echo "Pulling the production image from GHCR..."
docker compose -f docker-compose.prod.yml pull

# Run the container in detached mode
echo "Starting production services..."
docker compose -f docker-compose.prod.yml up -d

echo "Production deployment complete!"
