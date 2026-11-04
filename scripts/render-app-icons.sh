#!/usr/bin/env bash
# Regenerates the PWA / home-screen icons in public/ from scripts/app-icon.html.
# Run: bash scripts/render-app-icons.sh   (needs Google Chrome; set CHROME to override the path)
set -euo pipefail
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PROFILE_DIR="$(mktemp -d)"
trap 'rm -rf "$PROFILE_DIR"' EXIT

render() { # <size> <output> [query]
  "$CHROME" --headless=new --user-data-dir="$PROFILE_DIR" --no-first-run --disable-gpu \
    --hide-scrollbars --force-device-scale-factor=1 --default-background-color=00000000 \
    --window-size="$1,$1" --screenshot="$PWD/$2" "file://$PWD/scripts/app-icon.html$3" 2>/dev/null
  echo "Wrote $2"
}

render 192 public/pwa-192x192.png ""
render 512 public/pwa-512x512.png ""
render 512 public/pwa-maskable-512x512.png "?maskable=1"
render 180 public/apple-touch-icon.png "?maskable=1"   # iOS rounds the corners itself
