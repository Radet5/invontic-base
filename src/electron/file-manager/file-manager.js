const fs = require("fs");
const electron = require("electron");

const baseDir = electron.app.getPath("userData") + "/";

const fileHandler = {
  // require("file-handler"); i.e. move this to it's own file
  saveJSONFile: (event, { fileType, fileName, fileData }) => {
    console.log(fileName, fileType, fileData);
    const directory = `${baseDir}${fileType}/`;
    fs.mkdir(directory, { recursive: true }, (err) => {
      if (err) {
        event.reply("save-json-file-reply", "Error creating directory");
      } else {
        const filePath = `${directory}${fileName}.json`;
        fs.writeFile(filePath, JSON.stringify(fileData), (err) => {
          if (err) {
            event.reply("save-json-file-reply", "Error saving file");
          } else {
            event.reply("save-json-file-reply", "saved");
          }
        });
      }
    });
  },
  listFiles: (fileType, event) => {
    const directory = `${baseDir}${fileType}/`;
    //console.log(directory);
    fs.readdir(directory, (err, files) => {
      if (err) {
        event.reply("list-files-reply", ["error reading directory"]);
      }
      //console.log(files);
      event.reply("list-files-reply", files);
    });
  },
};
const { ipcMain } = require("electron");

ipcMain.on("save-json-file", (event, fileData) => {
  fileHandler.saveJSONFile(event, fileData);
});

ipcMain.on("list-files", (event, fileType) => {
  fileHandler.listFiles(fileType, event);
});
