#!/usr/bin/env bash
# Regenerates public/social-preview.jpg (1200x630 og:image) from scripts/social-card.html.
# Edit the HTML (text, photo crop) first, then run: bash scripts/render-social-card.sh
# Requires Google Chrome (macOS path below; set CHROME to override) and macOS `sips`.
set -euo pipefail
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
TMP_PNG="$(mktemp -t social-card).png"
PROFILE_DIR="$(mktemp -d)"
"$CHROME" --headless=new --user-data-dir="$PROFILE_DIR" --no-first-run --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=8000 \
  --screenshot="$TMP_PNG" "file://$PWD/scripts/social-card.html" 2>/dev/null
sips -s format jpeg -s formatOptions 85 "$TMP_PNG" --out public/social-preview.jpg >/dev/null
rm -rf "$TMP_PNG" "$PROFILE_DIR"
echo "Wrote public/social-preview.jpg"
