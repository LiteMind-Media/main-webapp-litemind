#!/bin/bash

# Clean the git index
git rm -r --cached .

# Re-add everything
git add .

# Show what's being tracked
git status

echo "All files have been re-added to git tracking"
