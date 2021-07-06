import React, { useState } from "react";

import Grid from "../grid/grid";
import GridRecordInterface from "../grid/record/grid-record-interface";

interface InvoiceProps {
  invoiceId: string;
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
    Array<GridRecordInterface>
  >([]);
  return (
    <Grid
      entityId={props.invoiceId}
      fields={fields}
      records={invoiceRecords}
      setRecords={setInvoiceRecords}
    />
  );
};

export default Invoice;
