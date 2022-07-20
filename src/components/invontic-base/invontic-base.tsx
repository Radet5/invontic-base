import React, { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { UserInterface } from "../../modules/types/user";
import { UserContext } from "../context/user";

import { ErrorBoundary } from "../atoms/error-boundary/error-boundary";
import { ApplicationWrapper } from "../atoms/application-wrapper/application-wrapper";
import { InvoicePage } from "../pages/invoice-page";
import { LoginPage } from "../pages/login-page";

const blankInvoice = {
  id: uuidv4(),
  supplier_id: 0,
  supplier_name: "",
  supplier_invoice_id: "",
  invoice_date: "",
  invoice_type_id: 0,
  invoice_type: "",
  invoice_total: 0,
  accounting_date: "",
  invoice_records: [] as any,
};

const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_USER": {
      const { user }: { user: UserInterface } = action;
      return user;
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
    if (!user) {
      setSelectedPage("login-page");
    } else {
      setSelectedPage("invoice-page");
    }
  }, [user]);

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
    </ErrorBoundary>
  );
};

export default InvonticBase;
