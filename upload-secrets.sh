#!/bin/bash

# Set your project ID
PROJECT_ID=$(gcloud config get-value project)

# Check if .env file exists
if [ ! -f .env ]; then
  echo "Error: .env file not found!"
  exit 1
fi

# Read .env file and add secrets to Google Secret Manager
while IFS= read -r line || [ -n "$line" ]; do
  # Skip empty lines and comments
  if [[ -z "$line" || "$line" =~ ^# ]]; then
    continue
  fi

  # Extract key and value
  KEY=$(echo "$line" | cut -d '=' -f1)
  VALUE=$(echo "$line" | cut -d '=' -f2-)

  # Check if secret already exists
  if gcloud secrets describe "$KEY" --project="$PROJECT_ID" >/dev/null 2>&1; then
    echo "Updating secret: $KEY"
    echo -n "$VALUE" | gcloud secrets versions add "$KEY" --data-file=- --project="$PROJECT_ID"
  else
    echo "Creating secret: $KEY"
    echo -n "$VALUE" | gcloud secrets create "$KEY" --replication-policy="automatic" --data-file=- --project="$PROJECT_ID"
  fi

done < .env

echo "✅ All secrets have been uploaded successfully!"
