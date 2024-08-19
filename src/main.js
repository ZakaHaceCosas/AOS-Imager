// Modules to control application life and create native browser window
const { app, ipcMain, BrowserWindow, globalShortcut } = require("electron");
const os = require("os");
const path = require("path");

function createWindow() {
    // Create the application window with some spicey attributes that
    // I'm not gonna comment. :D
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: "hidden",
        maximizable: false,
        resizable: false,
        transparent: true,
        icon: path.join(__dirname, "./components/images/logo.ico"),
        frame: false,
        fullscreenable: false,
        webPreferences: {
            preload: path.join(__dirname, "./components/js/preload.js"),
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        icon: "./components/images/icon.png",
    });

    if (os.platform === "darwin") {
        // Position the macOS traffic lights into a more natural position
        mainWindow.setTrafficLightPosition({ x: 18, y: 18 });
    }

    mainWindow.setTitle(require("../package.json").productName);
    mainWindow.loadFile("./src/index.html");
    return mainWindow;
}

// Adding the IPC hook for window manipulation.
app.whenReady().then(() => {
    const imagerWindow = createWindow();
    ipcMain.on("close", () => {
        app.quit();
    });
    ipcMain.on("minimize", () => {
        imagerWindow.minimize();
    });

    // Blocking keybinds which shouldn't be triggered by the end user.
    // Works by re-registering the keybinds to console output
    // instead of the expected action.
    app.on("browser-window-focus", function () {
        /*globalShortcut.register("CommandOrControl+R", () => {
      console.log("CommandOrControl+R is pressed: Reloading disabled");
    });*/
        globalShortcut.register("F5", () => {
            console.log("F5 is pressed: Reloading is disabled");
        });
        globalShortcut.register("CommandOrControl+Plus", () => {
            console.log("CommandOrControl+Plus: Zooming is disabled");
        });
        globalShortcut.register("CommandOrControl+-", () => {
            console.log("CommandOrControl+-: Zooming is disabled");
        });
        globalShortcut.register("CommandOrControl+Shift+R", () => {
            console.log(
                "CommandOrControl+Shift+R: Force reloading is disabled"
            );
        });
        globalShortcut.register("CommandOrControl+W", () => {
            console.log(
                "CommandOrControl+W is pressed: Closing using a shortcut is unsupported"
            );
        });
        /*globalShortcut.register("CommandOrControl+Shift+I", () => {
      console.log(
        "CommandOrControl+Shift+I is pressed: The development console is disabled"
      );
    });*/
    });

    // When the app loses focus, we want to re-register the keybinds back,
    // so they perform the expected actions again.
    app.on("browser-window-blur", function () {
        /*globalShortcut.unregister('CommandOrControl+R');*/
        globalShortcut.unregister("F5");
        globalShortcut.unregister("CommandOrControl+Plus");
        globalShortcut.unregister("CommandOrControl+-");
        globalShortcut.unregister("CommandOrControl+Shift+R");
    });

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// We want the program to close when all windows are closed,
// even on macOS, overriding the default behaviour.
app.on("window-all-closed", function () {
    app.quit();
});
