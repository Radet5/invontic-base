const fileHandler = {
  // require("file-handler"); i.e. move this to it's own file
  saveJSONFile: ({ fileType, fileName, fileData }) => {
    console.log(fileName, fileType, fileData);
    return "saved";
  },
};
const { ipcMain } = require("electron");

ipcMain.on("save-json-file", (event, fileData) => {
  const fileStatus = fileHandler.saveJSONFile(fileData);
  event.reply("save-json-file-reply", fileStatus);
});
