import { v4 as uuidv4 } from "uuid";

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
