#!/bin/bash

# Find files that differ only in case (potential issue on case-insensitive file systems)
find . -type f | sort -f | uniq -i -d

echo "If any files are listed above, they have name conflicts due to case sensitivity"
