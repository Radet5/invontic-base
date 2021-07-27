import React, { useState, useEffect } from "react";

import Grid from "../grid/grid";
import SaveButton from "../save-button/save-button";

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
  const [editTimestamp, setEditTimestamp] = useState("");

  useEffect(() => {
    setEditTimestamp(new Date().toISOString());
  }, [invoiceRecords]);

  const defaultInvoiceRecord = {
    itemId: "",
    quantity: 0,
    cost: 0,
  };

  console.log(invoiceRecords);

  return (
    <React.Fragment>
      <Grid
        entityId={props.invoiceId}
        fields={fields}
        records={invoiceRecords}
        setRecords={setInvoiceRecords}
        defaultRecord={defaultInvoiceRecord}
      />
      <SaveButton
        editTimestamp={editTimestamp}
        fileName={props.invoiceId}
        fileType="invoice"
        fileData={invoiceRecords}
        label="Save Invoice"
      />
    </React.Fragment>
  );
};

export default Invoice;
