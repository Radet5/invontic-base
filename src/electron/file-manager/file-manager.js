const fs = require("fs");
const electron = require("electron");

const baseDir = electron.app.getPath("userData") + "/";

const fileHandler = {
  // require("file-handler"); i.e. move this to it's own file
  saveJSONFile: ({ fileType, fileName, fileData }) => {
    console.log(fileName, fileType, fileData);
    const directory = `${baseDir}${fileType}/`;
    fs.mkdir(directory, { recursive: true }, (err) => {
      if (err) {
        return "error making directory";
      }
    });
    const filePath = `${directory}${fileName}.json`;
    try {
      fs.writeFileSync(filePath, JSON.stringify(fileData));
      return "saved";
    } catch (e) {
      console.log(e);
      return "error saving file";
    }
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
  const fileStatus = fileHandler.saveJSONFile(fileData);
  event.reply("save-json-file-reply", fileStatus);
});

ipcMain.on("list-files", (event, fileType) => {
  fileHandler.listFiles(fileType, event);
});
