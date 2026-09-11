# Auto Raise New Windows (GNOME Shell Extension)

<div align="center">
  <img src="logo.svg" alt="Auto Raise New Windows logo">
</div>

A GNOME Shell extension that solves the notorious Linux bug where Electron apps (like VS Code) open their "Save/Open" dialogs or secondary windows hidden behind the main application.
This extension automatically raises and focuses newly created top-level and dialog windows for active applications (solves VS Code open/save dialog issues).

The extension includes **Background Immunity**. It explicitly checks if the newly spawned dialog belongs to the application you are currently focused on. This prevents the "stuck spinner" bug on app launch and stops background apps from stealing your focus.



## Directory Structure
- `gnome-45-plus/`: For GNOME 45 through 50+ (Ubuntu 23.10+, Fedora 39+).
- `gnome-3-to-44/`: For GNOME 3.28 through 44 (Ubuntu 18.04 LTS to 22.04 LTS).

## Quick Installation
- **GNOME 45+**: `cd gnome-45-plus && ./install.sh`
- **GNOME 3.28-44**: `cd gnome-3-to-44 && ./install.sh`
- Restart GNOME Shell (Wayland: Log out/in | X11: press Alt+F2 -> `r`)
