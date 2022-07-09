import React, { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import Invoice from "../invoice/invoice";
//import FileList from "../file-list/file-list";
import { Drawer } from "../drawer/drawer";
import { InvoiceNavigator } from "../invoice-navigator/invoice-navigator";
import { TitleBar } from "../title-bar/title-bar";
import { InvoiceGoodsEditor } from "../invoice-goods-editor/invoice-goods-editor";

import { jsonData } from "./temp_data";

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

const invoiceReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOAD_INVOICES": {
      const invoices: { [key: number]: any } = {};
      Object.keys(jsonData.invoices).forEach((key) => {
        invoices[parseInt(key)] = jsonData.invoices[parseInt(key)].data;
      });
      return {
        ...state,
        invoices: invoices,
      };
    }
    case "SELECT": {
      return {
        ...state,
        selectedId: action.id,
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

const baseUrl = process.env.API_URL;

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

const goodsReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOAD_GOODS": {
      return jsonData.goods[action.supplier_id];
    }
    case "ADD_GOOD": {
      return [...state, action.payload];
    }
    case "UPDATE_GOOD": {
      const { id, key, value } = action;
      const newState = [...state];
      newState.find((good: any) => good.id === id)[key] = value;
      return newState;
    }
    case "SET_SEARCH_SCORES": {
      const { key, id_value_map } = action;
      const newState = [...state];
      newState.forEach((good: any) => {
        good[key] = id_value_map[good.id] || 1;
      });
      newState.sort((a: any, b: any) => a[key] - b[key]);
      return newState;
    }
    case "SET_ALL_GOODS": {
      return action.payload;
    }
    case "SORT": {
      const { sort_function } = action;
      const newState = [...state];
      newState.sort(sort_function);
      return newState;
    }
  }
  return state;
};

const InvonticBase = (): JSX.Element => {
  const [invoicesState, invoicesDispatch] = useReducer(invoiceReducer, {
    selectedId: "",
    invoices: [],
  });
  const [goodsState, goodsDispatch] = useReducer(goodsReducer, []);
  const [goodsDrawerOpen, setGoodsDrawerOpen] = useState(false);
  const [invoiceDrawerOpen, setInvoiceDrawerOpen] = useState(false);

  //initialize invoices
  useEffect(() => {
    invoicesDispatch({
      type: "LOAD_INVOICES",
    });
  }, []);

  //when invoice is selected, load goods
  useEffect(() => {
    if (invoicesState.selectedId !== "") {
      const selectedId = invoicesState.selectedId;
      const selectedInvoice = invoicesState.invoices[selectedId];
      const goods = retrieveGoods(selectedInvoice.supplier_id);
      goods.then((goods) => {
        goodsDispatch({
          type: "SET_ALL_GOODS",
          payload: goods,
        });
      });
    }
  }, [invoicesState.selectedId, invoicesState.invoices]);

  const invoice = invoicesState.invoices[invoicesState.selectedId];
  const goods = goodsState;

  return (
    <div className="o-invonticBase">
      <TitleBar />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "calc(90vw - 20px)",
          marginTop: "calc(5vh + 32px)",
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        <Drawer isOpen={invoiceDrawerOpen} setIsOpen={setInvoiceDrawerOpen}>
          <InvoiceNavigator
            dispatch={invoicesDispatch}
            invoices={invoicesState.invoices}
          />
        </Drawer>
        <div
          style={{
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Invoice
            invoice={invoice}
            dispatch={invoicesDispatch}
            suppliers={jsonData.suppliers}
            invoiceTypes={jsonData.invoiceTypes}
            goods={goods}
          />
        </div>
        <Drawer
          isOpen={goodsDrawerOpen}
          setIsOpen={setGoodsDrawerOpen}
          side="right"
        >
          <InvoiceGoodsEditor
            isDisplayed={goodsDrawerOpen}
            goods={goods}
            dispatch={goodsDispatch}
            departments={jsonData.departments}
          />
        </Drawer>
      </div>
    </div>
  );
};

export default InvonticBase;
