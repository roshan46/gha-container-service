# Container delivery exercise

Read Lab 6 in the study module. This repository builds the Node API as a multi-stage non-root image, tests and scans it, generates an SBOM, and publishes the same tested image to GHCR only from trusted main runs.

Configure the `registry` environment and required checks before release. Verify the published digest's attestation before consuming it. PR workflows cannot publish.
