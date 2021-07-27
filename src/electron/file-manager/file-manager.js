const fs = require("fs");
const electron = require("electron");

const baseDir = electron.app.getPath("userData") + "/";

const fileHandler = {
  // require("file-handler"); i.e. move this to it's own file
  saveJSONFile: ({ fileType, fileName, fileData }, reply) => {
    console.log(fileName, fileType, fileData);
    const directory = `${baseDir}${fileType}/`;
    fs.mkdir(directory, { recursive: true }, (err) => {
      if (err) {
        reply("Error creating directory");
      } else {
        const filePath = `${directory}${fileName}.json`;
        fs.writeFile(filePath, JSON.stringify(fileData), (err) => {
          if (err) {
            reply("Error saving file");
          } else {
            reply("saved");
          }
        });
      }
    });
  },
  listFiles: (fileType, reply) => {
    const directory = `${baseDir}${fileType}/`;
    //console.log(directory);
    fs.readdir(directory, (err, files) => {
      if (err) {
        reply(["error reading directory"]);
      }
      //console.log(files);
      reply(files);
    });
  },
};
const { ipcMain } = require("electron");

ipcMain.on("save-json-file", (event, fileData) => {
  const reply = (data) => {
    event.reply("save-json-file-reply", data);
  };
  fileHandler.saveJSONFile(fileData, reply);
});

ipcMain.on("list-files", (event, fileType) => {
  const reply = (data) => {
    event.reply("list-files-reply", data);
  };
  fileHandler.listFiles(fileType, reply);
});
