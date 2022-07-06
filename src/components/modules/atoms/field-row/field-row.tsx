import React from "react";
import "./field-row.scss";

interface FieldRowProps {
  children: React.ReactNode;
}

export const FieldRow = ({ children }: FieldRowProps): JSX.Element => {
  return <div className="a-field-row">{children}</div>;
};
