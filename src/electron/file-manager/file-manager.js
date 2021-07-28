const fs = require("fs");
const electron = require("electron");

const baseDir = electron.app.getPath("userData") + "/";

const fileHandler = {
  // require("file-handler"); i.e. move this to it's own file
  saveJSONFile: ({ subDirectory, fileName, fileData }, reply) => {
    console.log(fileName, subDirectory, fileData);
    const directory = `${baseDir}${subDirectory}/`;
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
  listFiles: (subDirectory, reply) => {
    const directory = `${baseDir}${subDirectory}/`;
    //console.log(directory);
    fs.readdir(directory, { withFileTypes: true }, (err, files) => {
      if (err) {
        reply(["error reading directory"]);
      } else {
        //console.log(files);
        const fileList = files.map((file) => {
          return {
            name: file.name,
            type: file.isDirectory() ? "directory" : "file",
          };
        });
        reply(fileList);
      }
    });
  },
  getFile: (subDirectory, fileName, reply) => {
    const directory = `${baseDir}${subDirectory}/`;
    const filePath = `${directory}${fileName}.json`;
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reply({ error: "error reading file", data: [] });
      } else {
        reply(JSON.parse(data));
      }
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

ipcMain.on("list-files", (event, subDirectory) => {
  const reply = (data) => {
    event.reply("list-files-reply", data);
  };
  fileHandler.listFiles(subDirectory, reply);
});

ipcMain.on("load-json-file", (event, { subDirectory, fileName }) => {
  const reply = (data) => {
    event.reply("load-json-file-reply", data);
  };
  console.log(subDirectory, fileName);
  fileHandler.getFile(subDirectory, fileName, reply);
});
