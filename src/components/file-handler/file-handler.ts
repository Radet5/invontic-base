const electronAPI = window.electronAPI;

export class FileHandler {
  onSave = (onSaveFileStatus: (status: string) => void): void => {
    electronAPI.saveJSONFileReply((event: unknown, arg: string) => {
      onSaveFileStatus(arg);
    });
  };

  onFileList = (
    onFileList: (files: Array<Record<string, string>>) => void
  ): void => {
    electronAPI.listFilesReply(
      (event: unknown, arg: Array<Record<string, string>>) => {
        onFileList(arg);
      }
    );
  };

  onFileLoad = (onFileLoad: (fileContents: any) => void): void => {
    electronAPI.loadJSONFileReply((event: unknown, arg: any) => {
      arg.error ? console.warn(arg.error) : null;
      onFileLoad(arg);
    });
  };

  loadFile = (fileName: string, subDirectory: string): void => {
    electronAPI.loadJSONFile({ fileName, subDirectory });
  };

  loadSecureFile = (fileName: string, subDirectory: string): void => {
    electronAPI.loadSecureJSONFile({ fileName, subDirectory });
  };

  listFiles = async (subDirectory: string): Promise<any> => {
    return electronAPI.listFiles(subDirectory);
  };

  getManyFiles = async (
    subDirectory: string,
    fileNames: Array<string>
  ): Promise<any> => {
    return electronAPI.getManyFiles({ subDirectory, fileNames });
  };

  getManyFilesSecure = async (
    subDirectory: string,
    fileNames: Array<string>
  ): Promise<any> => {
    return electronAPI.getManyFilesSecure({ subDirectory, fileNames });
  };

  saveFile = (
    fileName: string,
    subDirectory: string,
    data: any,
    editTimestamp?: string
  ): void => {
    const fileData = { editTimestamp, data, fileName, subDirectory };
    electronAPI.saveJSONFile({ fileName, subDirectory, fileData });
  };

  saveSecureFile = (
    fileName: string,
    subDirectory: string,
    data: any,
    editTimestamp?: string
  ): void => {
    const fileData = { editTimestamp, data, fileName, subDirectory };
    electronAPI.saveSecureJSONFile({ fileName, subDirectory, fileData });
  };
}
