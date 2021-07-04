const { app, BrowserWindow } = require("electron");
const createWindow = () => {
  const window = new BrowserWindow({
    autoHideMenuBar: true,
  });

  window.loadFile("build/index.html");
};

app.whenReady().then(createWindow);
app.on("window-all-closed", () => app.quit());
