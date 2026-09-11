#!/bin/bash
set -e

UUID="auto-raise-new-windows@ubuntu1804.extension"
TARGET_DIR="$HOME/.local/share/gnome-shell/extensions/$UUID"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Installing extension for GNOME 3.28 - 44..."
mkdir -p "$TARGET_DIR"

cp -f "$SCRIPT_DIR/extension.js" "$TARGET_DIR/"
cp -f "$SCRIPT_DIR/metadata.json" "$TARGET_DIR/"
[ -f "$SCRIPT_DIR/logo.svg" ] && cp -f "$SCRIPT_DIR/logo.svg" "$TARGET_DIR/"

echo "Enabling extension in gsettings..."
CURRENT_EXTS=$(gsettings get org.gnome.shell enabled-extensions)

if [[ "$CURRENT_EXTS" == "@as []" || "$CURRENT_EXTS" == "[]" ]]; then
    NEW_EXTS="['$UUID']"
elif [[ "$CURRENT_EXTS" != *"$UUID"* ]]; then
    NEW_EXTS=$(echo "$CURRENT_EXTS" | sed "s/\]$/,'$UUID'\]/")
else
    NEW_EXTS="$CURRENT_EXTS"
fi

gsettings set org.gnome.shell enabled-extensions "$NEW_EXTS"

echo "============================================================"
echo "Installation complete!"
echo "To finish, restart GNOME Shell:"
echo "  - On X11: Press Alt+F2, type 'r', and press Enter."
echo "  - On Wayland: Log out and log back in."
echo "============================================================"
