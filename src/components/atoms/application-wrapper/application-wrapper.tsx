import React from "react";

import { TitleBar } from "../../title-bar/title-bar";

import "./application-wrapper.scss";

interface ApplicationWrapperProps {
  children: React.ReactNode;
}

export const ApplicationWrapper = ({
  children,
}: ApplicationWrapperProps): JSX.Element => {
  return (
    <div className="a-application-wrapper">
      <TitleBar />
      <div className="a-application-wrapper__content">{children}</div>
    </div>
  );
};
