import React from "react";
import "./field-row.scss";

interface FieldRowProps {
  children: React.ReactNode;
  hide?: boolean;
  noBorder?: boolean;
}

export const FieldRow = ({
  children,
  hide,
  noBorder,
}: FieldRowProps): JSX.Element => {
  const className = `a-field-row${hide ? " a-field-row--hide" : ""}${
    noBorder ? " a-field-row--no-border" : ""
  }`;

  return <div className={className}>{children}</div>;
};
