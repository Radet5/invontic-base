import React, { useState } from "react";

import Grid from "../grid/grid";
import FileHandler from "../file-handler/file-handler";

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
  const [fileSaveStatus, setFileSaveStatus] = useState("");

  const defaultInvoiceRecord = {
    itemId: "",
    quantity: 0,
    cost: 0,
  };

  console.log(invoiceRecords);
  console.log(fileSaveStatus);

  const saveInvoice = () => {
    const handler = new FileHandler();
    const filestatus = handler.saveFile(
      props.invoiceId,
      "invoice",
      invoiceRecords
    );
    setFileSaveStatus(filestatus);
  };

  return (
    <React.Fragment>
      <Grid
        entityId={props.invoiceId}
        fields={fields}
        records={invoiceRecords}
        setRecords={setInvoiceRecords}
        defaultRecord={defaultInvoiceRecord}
      />
      <button onClick={saveInvoice}>Save</button>
    </React.Fragment>
  );
};

export default Invoice;
