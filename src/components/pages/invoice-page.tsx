import React, {
  useState,
  useEffect,
  useReducer,
  Fragment,
  Dispatch,
} from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { StandardTemplate } from "../templates/standard/standard";
import { InvoiceNavigator } from "../molecules/invoice-navigator/invoice-navigator";
import { InvoiceGoodsEditor } from "../invoice-goods-editor/invoice-goods-editor";
import { Invoice } from "../invoice/invoice";
import { GoodsReducer } from "../reducers/goods-reducer";

import { jsonData } from "../invontic-base/temp_data";

interface InvoicePageProps {
  userDispatch: Dispatch<any>;
}

const baseUrl = process.env.API_URL;

const blankInvoice = {
  id: "",
  supplier_id: "",
  supplier_name: "",
  supplier_invoice_id: "",
  invoice_date: "",
  invoice_type_id: 0,
  invoice_type: "",
  invoice_total: 0,
  accounting_date: "",
  invoice_records: [] as any,
};

export const InvoicesReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SELECT": {
      return {
        ...state,
        selectedId: action.id,
        error: undefined,
      };
    }
    case "ERROR": {
      return {
        ...state,
        error: action.error,
      };
    }
    case "UPDATE_INVOICE": {
      const { key, value } = action;
      const { selectedId } = state;
      const newState = { ...state };
      newState.invoices[selectedId] = structuredClone(
        state.invoices[selectedId]
      );
      newState.invoices[selectedId][key] = value;
      return newState;
    }
    case "ADD_INVOICE": {
      const { invoice } = action;
      const newState = { ...state };
      newState.invoices = structuredClone(state.invoices);
      newState.invoices[invoice.id] = invoice;
      return newState;
    }
    case "CREATE_INVOICE": {
      const newState = { ...state };
      const newId = uuidv4();
      const newInvoice = { ...blankInvoice };
      newInvoice.id = newId;
      newState.invoices = structuredClone(state.invoices);
      newState.invoices[newId] = newInvoice;
      newState.selectedId = newId;
      return newState;
    }
    case "REPLACE_RECORD": {
      const { selectedId } = state;
      const newState = { ...state };
      newState.invoices[selectedId] = structuredClone(
        state.invoices[selectedId]
      );
      newState.invoices[selectedId].invoice_records = action.payload;
      return newState;
    }
    case "ADD_RECORD": {
      const { selectedId } = state;
      const newState = { ...state };
      newState.invoices[selectedId] = structuredClone(
        state.invoices[selectedId]
      );
      newState.invoices[selectedId].invoice_records.push(action.payload);
      return newState;
    }
    case "UPDATE_RECORD": {
      const { selectedId } = state;
      const { id, key, value } = action;
      const newState = { ...state };
      newState.invoices[selectedId].invoice_records = structuredClone(
        state.invoices[selectedId].invoice_records
      );
      newState.invoices[selectedId].invoice_records.find(
        (record: any) => record.id === id
      )[key] = value;
      return newState;
    }
  }
  return state;
};

const retrieveGoods = (supplier_id: number) => {
  return axios
    .get(`${baseUrl}suppliers/${supplier_id}/goods`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const InvoicePage = ({ userDispatch }: InvoicePageProps) => {
  const [invoicesState, invoicesDispatch] = useReducer(InvoicesReducer, {
    selectedId: "",
    invoices: [],
  });
  const [goodsState, goodsDispatch] = useReducer(GoodsReducer, []);

  const [goodsDrawerOpen, setGoodsDrawerOpen] = useState(false);

  useEffect(() => {
    console.log("InvoicePage Render");
  });

  //initialize invoices
  useEffect(() => {
    return () => {
      console.log("InvoicePage Unmount");
      axios
        .put(`${baseUrl}clear-invoice-lock`, {})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }, []);

  const selectedId = invoicesState.selectedId;
  const selectedInvoice = invoicesState.invoices[selectedId];
  const selectedSupplierId = selectedInvoice?.supplier_id;
  //when invoice is selected, load goods
  useEffect(() => {
    if (invoicesState.selectedId !== "") {
      const goods = retrieveGoods(selectedSupplierId);
      goods.then((goods) => {
        goodsDispatch({
          type: "SET_ALL_GOODS",
          payload: goods,
        });
      });
    }
  }, [invoicesState.selectedId, invoicesState.invoices, selectedSupplierId]);

  const invoice = invoicesState.invoices[invoicesState.selectedId];
  const goods = goodsState;

  const mainContent = invoicesState.error ? (
    <div>{invoicesState.error}</div>
  ) : selectedId != "" ? (
    <Fragment>
      <button
        style={{ display: "block" }}
        onClick={() => invoicesDispatch({ type: "CREATE_INVOICE" })}
      >
        Create New Invoice
      </button>
      <Invoice
        invoice={invoice}
        dispatch={invoicesDispatch}
        suppliers={jsonData.suppliers}
        invoiceTypes={jsonData.invoiceTypes}
        goods={goods}
      />
    </Fragment>
  ) : (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2>Invoice Editor</h2>
      <button onClick={() => invoicesDispatch({ type: "CREATE_INVOICE" })}>
        Create New Invoice
      </button>
    </div>
  );

  const LogoutButton = () => {
    return (
      <button
        style={{ fontSize: "12px" }}
        onClick={() => userDispatch({ type: "LOGOUT" })}
      >
        logout
      </button>
    );
  };

  return (
    <StandardTemplate
      leftDrawerContent={
        <InvoiceNavigator
          dispatch={invoicesDispatch}
          invoices={invoicesState.invoices}
        />
      }
      utilityBarContent={
        <Fragment>
          <div>not synced</div>
          <LogoutButton />
        </Fragment>
      }
      rightDrawerContent={
        <InvoiceGoodsEditor
          isDisplayed={goodsDrawerOpen}
          goods={goods}
          dispatch={goodsDispatch}
          departments={jsonData.departments}
        />
      }
      rightDrawerStateCallback={setGoodsDrawerOpen}
    >
      {mainContent}
    </StandardTemplate>
  );
};
