#!/usr/bin/env bash
set -euo pipefail
# Use immediately before a state-changing operation, under deployment concurrency.
latest=$(gh api "repos/$GITHUB_REPOSITORY/git/ref/heads/main" --jq '.object.sha')
if [[ "$latest" != "$GITHUB_SHA" ]]; then
  echo 'Stale release: main advanced; run the pipeline for the new commit.' >&2
  exit 1
fi
