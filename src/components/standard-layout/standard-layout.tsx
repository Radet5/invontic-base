import React, { Fragment, useState } from "react";

import { Drawer } from "../drawer/drawer";

interface StandardLayoutProps {
  children: React.ReactNode;
  leftDrawerContent: React.ReactNode;
  rightDrawerContent: React.ReactNode;
  leftDrawerStateCallback?: (state: boolean) => void;
  rightDrawerStateCallback?: (state: boolean) => void;
}

export const StandardLayout = ({
  children,
  leftDrawerContent,
  rightDrawerContent,
  leftDrawerStateCallback,
  rightDrawerStateCallback,
}: StandardLayoutProps): JSX.Element => {
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
      <div
        style={{
          width: "fit-content",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {children}
      </div>
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
