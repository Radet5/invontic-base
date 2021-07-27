const { ipcRenderer } = window.require("electron");
class FileHandler {
  saveFile = (fileName: string, fileType: string, fileData: any): string => {
    ipcRenderer.send("save-json-file", { fileName, fileType, fileData });
    return "saved";
  };
}
ipcRenderer.on("save-json-file-reply", (event, arg) => {
  console.log(arg);
});

export default FileHandler;
