#!/bin/bash

echo "=== Git Status ==="
git status

echo "\n=== Untracked Files ==="
git ls-files --others --exclude-standard

echo "\n=== Checking .gitignore ==="
cat .gitignore

echo "\n=== Files possibly being ignored ==="
git check-ignore -v *
