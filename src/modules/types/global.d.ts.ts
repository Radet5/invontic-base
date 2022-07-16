export {};

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

declare global {
  interface Window {
    electronAPI: {
      saveJSONFileReply: (callback: callback) => void;
      listFilesReply: (callback: callback) => void;
      loadJSONFileReply: (callback: callback) => void;
      loadJSONFile: ({ fileName, subDirectory }: LoadFile) => void;
      loadSecureJSONFile: ({ fileName, subDirectory }: LoadFile) => void;
      listFiles: (subDirectory: string) => any;
      getManyFiles: ({ subDirectory, fileNames }: GetManyFiles) => any;
      getManyFilesSecure: ({ subDirectory, fileNames }: GetManyFiles) => any;
      saveJSONFile: ({ fileName, subDirectory, fileData }: SaveFile) => void;
      saveSecureJSONFile: ({
        fileName,
        subDirectory,
        fileData,
      }: SaveFile) => void;
    };
  }
}
