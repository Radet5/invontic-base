import React, { useState } from "react";

import Grid from "../grid/grid";

interface InvoiceProps {
  invoiceId: string;
}

interface InvoiceRecordInterface {
  recordId: string | null;
  itemId: string;
  quantity: number;
  cost: number;
}

const fields = [
  {
    value: "",
    name: "itemId",
    type: "text",
    id: "itemId",
    label: "Item Id",
  },
  {
    value: "",
    name: "quantity",
    type: "number",
    id: "quantity",
    label: "Quantity",
  },
  {
    value: "",
    name: "cost",
    type: "number",
    id: "cost",
    label: "Cost per Unit",
  },
];

const Invoice = (props: InvoiceProps): JSX.Element => {
  const [invoiceRecords, setInvoiceRecords] = useState<
    Array<InvoiceRecordInterface>
  >([]);

  const defaultInvoiceRecord = {
    itemId: "",
    quantity: 0,
    cost: 0,
  };

  return (
    <Grid
      entityId={props.invoiceId}
      fields={fields}
      records={invoiceRecords}
      setRecords={setInvoiceRecords}
      defaultRecord={defaultInvoiceRecord}
    />
  );
};

export default Invoice;
