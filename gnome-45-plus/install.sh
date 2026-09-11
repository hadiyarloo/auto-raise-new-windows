#!/bin/bash
set -e
UUID="auto-raise-new-windows@ubuntu1804.extension"
echo "Packaging extension..."
gnome-extensions pack --force
echo "Installing extension..."
gnome-extensions install --force "${UUID}.shell-extension.zip"
echo "Enabling extension..."
gnome-extensions enable "$UUID"
echo "Installation complete! Please log out and log back in (Wayland) or Alt+F2 -> r (X11)."
