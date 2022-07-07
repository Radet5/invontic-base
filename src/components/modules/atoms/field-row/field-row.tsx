import React from "react";
import "./field-row.scss";

interface FieldRowProps {
  children: React.ReactNode;
  hide?: boolean;
}

export const FieldRow = ({ children, hide }: FieldRowProps): JSX.Element => {
  return <div className={`a-field-row ${hide ? "-hide" : ""}`}>{children}</div>;
};
