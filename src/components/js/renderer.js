const ipc = require("electron").ipcRenderer;

// Function for closing the app using Electron's ipcMain.
function closeApp(e) {
  e.preventDefault();
  ipc.send("close");
}

// Function for minimizing the app using Electron's ipcMain.
function minimizeApp(e) {
  e.preventDefault();
  ipc.send("minimize");
}

// If the platform is macOS, we want to get rid of the window controls
// in favor of the traffic lights, thus expanding the drag region and moving the title.
if (process.platform == "darwin") {
  document.getElementById("buttons").style.visibility = "hidden";
  document.getElementById("drag").style.width = "100%";
  document.getElementById("title").style.left = "85px";
}

// If the platform is non-macOS, however, we want to add a listener for window controls.
if (process.platform !== "darwin") {
  document.getElementById("closeBtn").addEventListener("click", closeApp);
  document.getElementById("minBtn").addEventListener("click", minimizeApp);
}

// Add the is-loaded property to the main element.
document.getElementById("main").classList.add("is-loaded");
