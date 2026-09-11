import Meta from 'gi://Meta';
import GLib from 'gi://GLib';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

export default class AutoRaiseNewWindowsExtension extends Extension {
    enable() {
        this._windowCreatedId = global.display.connect('window-created', this._onWindowCreated.bind(this));
    }

    disable() {
        if (this._windowCreatedId) {
            global.display.disconnect(this._windowCreatedId);
            this._windowCreatedId = null;
        }
    }

    _onWindowCreated(display, window) {
        if (!window) return;
        try {
            if (window.is_override_redirect()) return;

            let type = window.get_window_type();
            let isNormal = (type === Meta.WindowType.NORMAL);
            let isDialog = (type === Meta.WindowType.DIALOG || type === Meta.WindowType.MODAL_DIALOG);
            let isUtility = (type === Meta.WindowType.UTILITY);

            if (!isNormal && !isDialog && !isUtility) return;

            let focusWindow = global.display.focus_window;
            if (focusWindow) {
                let focusPid = focusWindow.get_pid();
                let newPid = window.get_pid();
                let focusClass = focusWindow.get_wm_class();
                let newClass = window.get_wm_class();

                let pidMatch = (focusPid > 0 && newPid > 0 && focusPid === newPid);
                let classMatch = (focusClass && newClass && focusClass === newClass);

                if (!pidMatch && !classMatch) return; 
            }

            GLib.timeout_add(GLib.PRIORITY_DEFAULT, 50, () => {
                try {
                    if (window && window.get_workspace()) {
                        let time = global.get_current_time();
                        window.raise();
                        Main.activateWindow(window, time);
                    }
                } catch (e) {
                    console.error(e);
                }
                return GLib.SOURCE_REMOVE;
            });
        } catch (e) {
            console.error(e);
        }
    }
}
