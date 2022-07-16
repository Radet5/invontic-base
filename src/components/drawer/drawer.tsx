import React, { Fragment, useState, useEffect } from "react";
import "./drawer.scss";

interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  side?: "left" | "right";
}

export const Drawer = ({
  children,
  isOpen,
  setIsOpen,
  side = "left",
}: DrawerProps): JSX.Element => {
  const [hide, setHide] = useState(true);
  const open = (): void => {
    setIsOpen(true);
  };

  useEffect(() => {
    setHide(false);
  }, []);

  const close = (): void => {
    setIsOpen(false);
  };

  const openClass = isOpen ? " m-drawer--open" : "";
  const hideClass = hide ? " m-drawer__open-button--hide" : "";
  const hideClassRight = hide ? " m-drawer__open-button-right--hide" : "";
  if (side === "left") {
    return (
      <Fragment>
        <button
          className={`m-drawer__open-button${hideClass}`}
          onClick={open}
          tabIndex={!isOpen ? undefined : -1}
        >
          &gt;
        </button>
        <div className={`m-drawer${openClass}`}>
          <button
            className="m-drawer__close-button"
            onClick={close}
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
          className={`m-drawer__open-button m-drawer__open-button-right${hideClassRight}`}
          onClick={open}
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
            onClick={close}
            tabIndex={isOpen ? undefined : -1}
          >
            <span>&gt;</span>
          </button>
        </div>
      </Fragment>
    );
  }
};
