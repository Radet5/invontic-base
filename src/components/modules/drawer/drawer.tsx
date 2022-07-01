import React, { Fragment, useState } from "react";
import "./drawer.scss";

interface DrawerProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  side?: "left" | "right";
}

export const Drawer = ({
  children,
  defaultOpen = false,
  side = "left",
}: DrawerProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const openClass = isOpen ? " m-drawer--open" : "";
  if (side === "left") {
    return (
      <Fragment>
        <button
          className="m-drawer__open-button"
          onClick={() => setIsOpen(true)}
          tabIndex={!isOpen ? undefined : -1}
        >
          &gt;
        </button>
        <div className={`m-drawer${openClass}`}>
          <button
            className="m-drawer__close-button"
            onClick={() => setIsOpen(false)}
            tabIndex={isOpen ? undefined : -1}
          >
            <span>&lt;</span>
          </button>
          <div className="m-drawer__content">{children}</div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <button
          className="m-drawer__open-button m-drawer__open-button-right"
          onClick={() => setIsOpen(true)}
          tabIndex={!isOpen ? undefined : -1}
        >
          &lt;
        </button>
        <div className={`m-drawer m-drawer-right${openClass}`}>
          <div className="m-drawer__content m-drawer__content-right">
            {children}
          </div>
          <button
            className="m-drawer__close-button"
            onClick={() => setIsOpen(false)}
            tabIndex={isOpen ? undefined : -1}
          >
            <span>&gt;</span>
          </button>
        </div>
      </Fragment>
    );
  }
};
