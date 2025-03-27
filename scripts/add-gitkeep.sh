#!/bin/bash

# Find empty directories and add .gitkeep
find . -type d -empty -not -path "*/node_modules/*" -not -path "*/.git/*" -exec touch {}/.gitkeep \;

echo "Added .gitkeep to empty directories"
