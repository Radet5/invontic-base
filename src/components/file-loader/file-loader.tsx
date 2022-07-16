import React, { useState, useEffect } from "react";
import { FileHandler } from "../file-handler/file-handler";

interface FileLoaderProps {
  onLoad: (fileContents: any) => void;
  subDirectory: string;
  fileName: string;
}

const FileLoader = ({
  onLoad,
  subDirectory,
  fileName,
}: FileLoaderProps): JSX.Element => {
  const [fileHandler] = useState(() => new FileHandler());

  useEffect(() => {
    fileHandler.onFileLoad((contents) => onLoad(contents.data));
  }, [fileHandler, onLoad]);

  useEffect(() => {
    fileHandler.loadFile(fileName, subDirectory);
  }, [subDirectory, fileName, fileHandler]);

  return (
    <button onClick={() => fileHandler.loadFile(fileName, subDirectory)}>
      Load Data
    </button>
  );
};

export default FileLoader;
