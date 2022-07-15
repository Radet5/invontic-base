import React, { useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { UserInterface } from "../../modules/types/user";
import { UserContext } from "../context/user";

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

  useEffect(() => {
    console.log("ROOT RENDERED");
  });

  let page: JSX.Element;
  if (!user) {
    page = <LoginPage dispatch={userDispatch} />;
  } else {
    page = <InvoicePage />;
  }

  return (
    <ApplicationWrapper>
      <UserContext.Provider value={...user}> {page}</UserContext.Provider>
    </ApplicationWrapper>
  );
};

export default InvonticBase;
