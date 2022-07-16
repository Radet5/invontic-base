// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron")

interface callback {
  (event: unknown, arg: any): void;
}

interface FileData {
  fileName: string;
  subDirectory: string;
  data: any;
  editTimestamp?: string;
}

interface SaveFile {
  fileName: string;
  subDirectory: string;
  fileData: FileData;
}

interface LoadFile {
  fileName: string;
  subDirectory: string;
}

interface GetManyFiles {
  subDirectory: string;
  fileNames: Array<string>;
}

contextBridge.exposeInMainWorld("electronAPI", {
  saveJSONFileReply: (callback: callback) =>
    ipcRenderer.on("save-json-file-reply", callback),

  listFilesReply: (callback: callback) =>
    ipcRenderer.on("list-files-reply", callback),

  loadJSONFileReply: (callback: callback) =>
    ipcRenderer.on("load-json-file-reply", callback),

  loadJSONFile: ({ fileName, subDirectory }: LoadFile) =>
    ipcRenderer.send("load-json-file", { fileName, subDirectory }),

  loadSecureJSONFile: ({ fileName, subDirectory }: LoadFile) =>
    ipcRenderer.send("load-secure-json-file", { fileName, subDirectory }),

  listFiles: (subDirectory: string) =>
    ipcRenderer.invoke("list-files", subDirectory),

  getManyFiles: ({ subDirectory, fileNames }: GetManyFiles) =>
    ipcRenderer.invoke("get-many-files", { subDirectory, fileNames }),

  getManyFilesSecure: ({ subDirectory, fileNames }: GetManyFiles) =>
    ipcRenderer.invoke("get-many-files-secure", { subDirectory, fileNames }),

  saveJSONFile: ({ fileName, subDirectory, fileData }: SaveFile) =>
    ipcRenderer.send("save-json-file", { fileName, subDirectory, fileData }),

  saveSecureJSONFile: ({ fileName, subDirectory, fileData }: SaveFile) =>
    ipcRenderer.send("save-secure-json-file", {
      fileName,
      subDirectory,
      fileData,
    }),
});
