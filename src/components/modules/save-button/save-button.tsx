import React, { useState, useEffect } from "react";
import FileHandler from "../file-handler/file-handler";

interface SaveButtonProps {
  fileName: string;
  fileType: string;
  fileData: any;
  editTimestamp: string;
  label: string;
}

const SaveButton = ({
  fileName,
  fileType,
  fileData,
  editTimestamp,
  label,
}: SaveButtonProps): JSX.Element => {
  const [saveStatus, setSaveStatus] = useState("");
  const [fileHandler] = useState(() => new FileHandler());

  useEffect(() => {
    fileHandler.onSave(saveCallback);
  }, [fileHandler]);

  useEffect(() => {
    setSaveStatus("");
  }, [editTimestamp]);

  const saveCallback = (status: string) => {
    setSaveStatus(status);
  };

  const saveFile = () => {
    setSaveStatus("Saving...");
    fileHandler.saveFile(fileName, fileType, fileData, editTimestamp);
  };

  return (
    <div className="m-saveButton">
      <button onClick={saveFile}>{label}</button>
      <div className="m-saveButton__status">{saveStatus}</div>
    </div>
  );
};

export default SaveButton;
