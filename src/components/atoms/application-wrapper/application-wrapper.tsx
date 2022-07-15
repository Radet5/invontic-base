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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "calc(90vw - 20px)",
          marginTop: "calc(5vh + 32px)",
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
};
