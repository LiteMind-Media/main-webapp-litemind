#!/bin/bash

# Fix permissions for all typescript files
find . -name "*.tsx" -o -name "*.ts" | xargs chmod 644

echo "Fixed file permissions for TypeScript files"
