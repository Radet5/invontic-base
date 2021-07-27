import React, { useState, useEffect } from "react";

import FileHandler from "../file-handler/file-handler";

interface FileListProps {
  fileType: string;
}

const FileList = ({ fileType }: FileListProps): JSX.Element => {
  const [fileHandler] = useState(() => new FileHandler());
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    fileHandler.onFileList(setFiles);
  }, [fileHandler]);

  useEffect(() => {
    fileHandler.listFiles(fileType);
  }, [fileHandler, fileType]);

  return (
    <div>
      <h1>File List</h1>
      {files.map((file) => (
        <li key={`file-${file}`}>{file.split(".")[0]}</li>
      ))}
    </div>
  );
};

export default FileList;
