import React, { useState, useEffect } from "react";

import FileHandler from "../file-handler/file-handler";

interface FileListProps {
  subDirectory: string;
  setSelectedFile: (fileName: string) => void;
}

const FileList = ({
  subDirectory,
  setSelectedFile,
}: FileListProps): JSX.Element => {
  const [fileHandler] = useState(() => new FileHandler());
  const [files, setFiles] = useState<Array<Record<string, string>>>([]);

  useEffect(() => {
    fileHandler.onFileList(setFiles);
  }, [fileHandler]);

  console.log(files);

  useEffect(() => {
    fileHandler.listFiles(subDirectory);
  }, [fileHandler, subDirectory]);

  const handleFileSelect = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    fileName: string
  ) => {
    e.preventDefault();
    setSelectedFile(fileName);
  };

  return (
    <div>
      <div style={{ textTransform: "capitalize" }}>{subDirectory} files</div>
      {files.map((fileObj) => {
        const fileName = fileObj.name;
        const fileType = fileObj.type;
        if (fileType === "file") {
          const fileDisplayName = fileName.split(".")[0];
          return (
            <li key={`file-${fileName}`} style={{ fontSize: "0.5em" }}>
              <span onClick={(e) => handleFileSelect(e, fileDisplayName)}>
                {fileDisplayName}
              </span>
            </li>
          );
        }
      })}
    </div>
  );
};

export default FileList;
