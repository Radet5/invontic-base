import React from "react";

import "./single-component.scss";

interface SingleComponentTemplateProps {
  children: React.ReactNode;
}

export const SingleComponentTemplate = ({
  children,
}: SingleComponentTemplateProps): JSX.Element => {
  return <div className="single-component-template">{children}</div>;
};
