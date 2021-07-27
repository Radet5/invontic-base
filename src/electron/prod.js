const { app, BrowserWindow } = require("electron");
require("./file-manager/file-manager");
const createWindow = () => {
  const window = new BrowserWindow({
    autoHideMenuBar: true,
  });

  window.loadFile("build/index.html");
};

app.whenReady().then(createWindow);
app.on("window-all-closed", () => app.quit());
