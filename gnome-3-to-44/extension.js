const Meta = imports.gi.Meta;
const GLib = imports.gi.GLib;
const Main = imports.ui.main;

let windowCreatedId = 0;

function onWindowCreated(display, window) {
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

        GLib.timeout_add(GLib.PRIORITY_DEFAULT, 50, function() {
            try {
                if (window && window.get_workspace()) {
                    let time = global.get_current_time();
                    window.raise();
                    Main.activateWindow(window, time);
                }
            } catch (e) {}
            return false;
        });
    } catch (e) {}
}

function init() {}
function enable() {
    if (global.display) windowCreatedId = global.display.connect('window-created', onWindowCreated);
}
function disable() {
    if (windowCreatedId > 0) {
        if (global.display) global.display.disconnect(windowCreatedId);
        windowCreatedId = 0;
    }
}
