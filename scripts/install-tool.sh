#!/usr/bin/env bash
set -euo pipefail
mkdir -p "$RUNNER_TEMP/lab-bin"
case "$1" in
 gitleaks) url=https://github.com/gitleaks/gitleaks/releases/download/v8.30.1/gitleaks_8.30.1_linux_x64.tar.gz; sha=551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb ;;
 trivy) url=https://github.com/aquasecurity/trivy/releases/download/v0.76.0/trivy_0.76.0_Linux-64bit.tar.gz; sha=e24b1c51293c1b15e4ba8d45bbc7891ba053f90278ec2698f3562c993e145fe7 ;;
 actionlint) url=https://github.com/rhysd/actionlint/releases/download/v1.7.12/actionlint_1.7.12_linux_amd64.tar.gz; sha=8aca8db96f1b94770f1b0d72b6dddcb1ebb8123cb3712530b08cc387b349a3d8 ;;
 *) echo 'Unknown tool' >&2; exit 2 ;;
esac
archive="$RUNNER_TEMP/$1.tar.gz"
curl --fail --silent --show-error --location --retry 3 "$url" -o "$archive"
printf '%s  %s\n' "$sha" "$archive" | sha256sum --check
tar -xzf "$archive" -C "$RUNNER_TEMP/lab-bin" "$1"
echo "$RUNNER_TEMP/lab-bin" >> "$GITHUB_PATH"
