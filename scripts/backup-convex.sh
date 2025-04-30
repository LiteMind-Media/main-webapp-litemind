#!/bin/bash

# Convex Data Backup Script
# Creates regular backups of the Convex database

# Configuration
BACKUP_DIR="/home/$(whoami)/convex-backups"
DATA_DIR="/home/$(whoami)/litemind-webapp/convex-data"
DATE=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="convex-backup-$DATE.tar.gz"
MAX_BACKUPS=7 # Keep a week's worth of backups

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Create backup
echo "Creating backup of Convex data..."
tar -czf "$BACKUP_DIR/$BACKUP_FILE" -C $(dirname "$DATA_DIR") $(basename "$DATA_DIR")

# Check if backup was successful
if [ $? -eq 0 ]; then
  echo "Backup created successfully: $BACKUP_DIR/$BACKUP_FILE"
else
  echo "Backup failed!"
  exit 1
fi

# Cleanup old backups
echo "Cleaning up old backups..."
ls -t "$BACKUP_DIR"/convex-backup-*.tar.gz | tail -n +$((MAX_BACKUPS+1)) | xargs -r rm

echo "Backup process completed."
