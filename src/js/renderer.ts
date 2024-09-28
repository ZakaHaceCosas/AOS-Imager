const ipc = require("electron").ipcRenderer;

// Function for closing the app using Electron's ipcMain.
function closeApp(e: Event) {
    e.preventDefault();
    ipc.send("close");
}

// Function for minimizing the app using Electron's ipcMain.
function minimizeApp(e: Event) {
    e.preventDefault();
    ipc.send("minimize");
}

// If the platform is macOS, we want to get rid of the window controls
// in favor of the traffic lights, thus expanding the drag region and moving the title.
if (process.platform == "darwin") {
    const buttons = document.getElementById("buttons");
    const drag = document.getElementById("drag");
    const title = document.getElementById("title");

    if (buttons && drag && title) {
        buttons.style.visibility = "hidden";
        title.style.left = "85px";
        drag.style.width = "100%";
    } else {
        throw new Error("Either buttons or drag or title are missing.")
    }
}

// If the platform is non-macOS, however, we want to add a listener for window controls.
if (process.platform !== "darwin") {
    const closeButton = document.getElementById("closeBtn")
    const minimizeButton = document.getElementById("minBtn")

    if (closeButton && minimizeButton) {
        closeButton.addEventListener("click", closeApp);
        minimizeButton.addEventListener("click", minimizeApp);
    } else {
        throw new Error("Either closeBtn or minBtn are missing.")
    }
}

// Add the is-loaded property to the main element.
document.getElementById("main")?.classList.add("is-loaded");
