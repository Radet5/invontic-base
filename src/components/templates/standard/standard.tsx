import React, { Fragment, useState } from "react";

import { Drawer } from "../../atoms/drawer/drawer";

import "./standard.scss";

interface StandardTemplateProps {
  children: React.ReactNode;
  leftDrawerContent: React.ReactNode;
  rightDrawerContent: React.ReactNode;
  leftDrawerStateCallback?: (state: boolean) => void;
  rightDrawerStateCallback?: (state: boolean) => void;
}

export const StandardTemplate = ({
  children,
  leftDrawerContent,
  rightDrawerContent,
  leftDrawerStateCallback,
  rightDrawerStateCallback,
}: StandardTemplateProps): JSX.Element => {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

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
      <Drawer isOpen={leftDrawerOpen} setIsOpen={toggleLeftDrawer}>
        {leftDrawerContent}
      </Drawer>
      <div className="standard-template__content">{children}</div>
      <Drawer
        isOpen={rightDrawerOpen}
        setIsOpen={toggleRightDrawer}
        side="right"
      >
        {rightDrawerContent}
      </Drawer>
    </Fragment>
  );
};
