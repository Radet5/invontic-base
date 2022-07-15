const { ipcRenderer } = window.require("electron");
class FileHandler {
  onSave = (onSaveFileStatus: (status: string) => void): void => {
    ipcRenderer.on("save-json-file-reply", (event: unknown, arg: string) => {
      onSaveFileStatus(arg);
    });
  };

  onFileList = (
    onFileList: (files: Array<Record<string, string>>) => void
  ): void => {
    ipcRenderer.on(
      "list-files-reply",
      (event: unknown, arg: Array<Record<string, string>>) => {
        onFileList(arg);
      }
    );
  };

  onFileLoad = (onFileLoad: (fileContents: any) => void): void => {
    ipcRenderer.on("load-json-file-reply", (event: unknown, arg: any) => {
      arg.error ? console.warn(arg.error) : null;
      onFileLoad(arg);
    });
  };

  loadFile = (fileName: string, subDirectory: string): void => {
    ipcRenderer.send("load-json-file", { fileName, subDirectory });
  };

  listFiles = (subDirectory: string): void => {
    ipcRenderer.send("list-files", subDirectory);
  };

  saveFile = (
    fileName: string,
    subDirectory: string,
    data: any,
    editTimestamp?: string
  ): void => {
    const fileData = { editTimestamp, data, fileName, subDirectory };
    ipcRenderer.send("save-json-file", { fileName, subDirectory, fileData });
  };
}

export default FileHandler;
