const { ipcRenderer } = window.require("electron");
class FileHandler {
  onSave = (onSaveFileStatus: (status: string) => void): void => {
    ipcRenderer.on("save-json-file-reply", (event: unknown, arg: string) => {
      onSaveFileStatus(arg);
    });
  };

  onFileList = (onFileList: (files: string[]) => void): void => {
    ipcRenderer.on("list-files-reply", (event: unknown, arg: string[]) => {
      onFileList(arg);
    });
  };

  listFiles = (fileType: string): void => {
    ipcRenderer.send("list-files", fileType);
  };

  saveFile = (
    fileName: string,
    fileType: string,
    data: any,
    editTimestamp?: string
  ): void => {
    const fileData = { editTimestamp, data, fileName, fileType };
    ipcRenderer.send("save-json-file", { fileName, fileType, fileData });
  };
}

export default FileHandler;
