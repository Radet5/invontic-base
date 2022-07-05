const { app, BrowserWindow } = require("electron");
require("./file-manager/file-manager");
try {
  require("electron-reloader")(module);
  // eslint-disable-next-line no-empty
} catch (_) {}

const createWindow = () => {
  const window = new BrowserWindow({
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: true,
    },
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#2f3241",
      symbolColor: "#74b1be",
    },
  });

  window.loadFile("build/index.html");
};

app.whenReady().then(createWindow);
app.on("window-all-closed", () => app.quit());
