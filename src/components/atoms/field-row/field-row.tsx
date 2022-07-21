import React from "react";
import "./field-row.scss";

interface FieldRowProps {
  children: React.ReactNode;
  hide?: boolean;
  noBorder?: boolean;
  setHovered?: (hovered: boolean) => void;
}

export const FieldRow = ({
  children,
  hide,
  noBorder,
  setHovered,
}: FieldRowProps): JSX.Element => {
  const className = `a-field-row${hide ? " a-field-row--hide" : ""}${
    noBorder ? " a-field-row--no-border" : ""
  }`;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
    >
      {children}
    </div>
  );
};
