import React, { Fragment, useState, useEffect } from "react";
import "./drawer.scss";

interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  side?: "left" | "right";
  hide?: boolean;
}

export const Drawer = ({
  children,
  isOpen,
  setIsOpen,
  side = "left",
  hide,
}: DrawerProps): JSX.Element => {
  const open = (): void => {
    setIsOpen(true);
  };

  const close = (): void => {
    setIsOpen(false);
  };

  const openClass = isOpen ? " a-drawer--open" : "";
  const hideClass = hide ? " a-drawer__open-button--hide" : "";
  const hideClassRight = hide ? " a-drawer__open-button-right--hide" : "";
  if (side === "left") {
    return (
      <Fragment>
        <button
          className={`a-drawer__open-button${hideClass}`}
          onClick={open}
          tabIndex={!isOpen ? undefined : -1}
        >
          &gt;
        </button>
        <div className={`a-drawer${openClass}`}>
          <button
            className="a-drawer__close-button"
            onClick={close}
            tabIndex={isOpen ? undefined : -1}
          >
            <span>&lt;</span>
          </button>
          <div className="a-drawer__content">{children}</div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <button
          className={`a-drawer__open-button a-drawer__open-button-right${hideClassRight}`}
          onClick={open}
          tabIndex={!isOpen ? undefined : -1}
        >
          &lt;
        </button>
        <div className={`a-drawer a-drawer-right${openClass}`}>
          <div className="a-drawer__content a-drawer__content-right">
            {children}
          </div>
          <button
            className="a-drawer__close-button"
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
