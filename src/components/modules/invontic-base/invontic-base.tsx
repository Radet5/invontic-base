import React, { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { Login } from "../login/login";
import { UserInterface } from "../types/user";

import { ApplicationWrapper } from "../atoms/application-wrapper/application-wrapper";
import { InvoicePage } from "../pages/invoice-page";

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
    page = <Login />;
  } else {
    page = <InvoicePage />;
  }

  return <ApplicationWrapper>{page}</ApplicationWrapper>;
};

export default InvonticBase;
