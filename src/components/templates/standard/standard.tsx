import React, { Fragment, useState, useEffect } from "react";

import { Drawer } from "../../atoms/drawer/drawer";

import "./standard.scss";

interface StandardTemplateProps {
  children: React.ReactNode;
  leftDrawerContent: React.ReactNode;
  rightDrawerContent: React.ReactNode;
  utilityBarContent: React.ReactNode;
  leftDrawerStateCallback?: (state: boolean) => void;
  rightDrawerStateCallback?: (state: boolean) => void;
}

export const StandardTemplate = ({
  children,
  leftDrawerContent,
  rightDrawerContent,
  utilityBarContent,
  leftDrawerStateCallback,
  rightDrawerStateCallback,
}: StandardTemplateProps): JSX.Element => {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [hide, setHide] = useState(true);

  useEffect(() => {
    setHide(false);
  }, []);

  const toggleLeftDrawer = (): void => {
    setLeftDrawerOpen(!leftDrawerOpen);
    if (leftDrawerStateCallback) {
      leftDrawerStateCallback(!leftDrawerOpen);
    }
  };

  const toggleRightDrawer = (): void => {
    setRightDrawerOpen(!rightDrawerOpen);
    if (rightDrawerStateCallback) {
      rightDrawerStateCallback(!rightDrawerOpen);
    }
  };

  return (
    <Fragment>
      <Drawer isOpen={leftDrawerOpen} hide={hide} setIsOpen={toggleLeftDrawer}>
        {leftDrawerContent}
      </Drawer>
      <div className="standard-template__content">{children}</div>
      <div className="standard-template__utility-bar">
        <div
          onMouseEnter={(): void => setHide(true)}
          onMouseLeave={(): void => setHide(false)}
          className="standard-template__utility-bar__content"
        >
          {utilityBarContent}
        </div>
      </div>
      <Drawer
        isOpen={rightDrawerOpen}
        hide={hide}
        setIsOpen={toggleRightDrawer}
        side="right"
      >
        {rightDrawerContent}
      </Drawer>
    </Fragment>
  );
};
