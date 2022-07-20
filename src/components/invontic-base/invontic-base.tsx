import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";

import { UserInterface } from "../../modules/types/user";
import { UserContext } from "../context/user";

import { ErrorBoundary } from "../atoms/error-boundary/error-boundary";
import { ApplicationWrapper } from "../atoms/application-wrapper/application-wrapper";
import { InvoicePage } from "../pages/invoice-page";
import { LoginPage } from "../pages/login-page";

const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_USER": {
      console.log("SET_USER");
      const { user, token }: { user: UserInterface; token: string } = action;
      const authInterceptorId = axios.interceptors.request.use((req: any) => {
        req.headers.authorization = `Bearer ${token}`;
        return req;
      });
      user.authInterceptorId = authInterceptorId;
      return user;
    }
    case "LOGOUT": {
      const newState = { authInterceptorId: state.authInterceptorId };
      return newState;
    }
    case "CLEAR_TOKEN": {
      if (state) {
        axios.interceptors.request.eject(state.authInterceptorId);
        console.log("TOKEN CLEARED");
      }
      return undefined;
    }
  }
  return state;
};

const InvonticBase = (): JSX.Element => {
  const [user, userDispatch] = useReducer(userReducer, undefined);
  const [selectedPage, setSelectedPage] = useState("login-page");

  useEffect(() => {
    console.log("ROOT RENDERED");
  });

  useEffect(() => {
    if (!user?.id) {
      setSelectedPage("login-page");
    } else {
      setSelectedPage("invoice-page");
    }
  }, [user]);

  //don't clear token until after locks are cleared
  useEffect(() => {
    if (selectedPage == "login-page") {
      userDispatch({ type: "CLEAR_TOKEN" });
    }
  }, [selectedPage]);

  let page: JSX.Element;
  switch (selectedPage) {
    case "login-page": {
      page = <LoginPage dispatch={userDispatch} />;
      break;
    }
    case "home-page": {
      page = <div>FIller</div>;
      break;
    }
    case "invoice-page": {
      page = <InvoicePage />;
      break;
    }
  }

  const tempSelect: React.ReactNode = null; // (
  //  <select
  //    value={selectedPage}
  //    onChange={(e) => setSelectedPage(e.target.value)}
  //  >
  //    <option value="login-page">Login Page</option>
  //    <option value="invoice-page">Invoice Page</option>
  //    <option value="home-page">Home Page</option>
  //  </select>
  //);

  return (
    <ErrorBoundary>
      <ApplicationWrapper>
        <UserContext.Provider value={...user}> {page}</UserContext.Provider>
      </ApplicationWrapper>
      {tempSelect}
      {user && (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => userDispatch({ type: "LOGOUT" })}
        >
          Logout
        </div>
      )}
    </ErrorBoundary>
  );
};

export default InvonticBase;
