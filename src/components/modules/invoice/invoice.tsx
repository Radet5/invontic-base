import React, { useState, useEffect } from "react";

import Grid from "../grid/grid";
import SaveButton from "../save-button/save-button";
import FileLoader from "../file-loader/file-loader";

interface InvoiceProps {
  invoiceId: string;
  vendors: any;
}

interface InvoiceRecordInterface {
  recordId: string | null;
  itemId: string;
  quantity: number;
  cost: number;
}

// react component dropdown list of vendors
const VendorSelect = ({ vendorId, onChange, vendors }) => {
  const options = vendors.map(vendor => {
    return (
      <option key={vendor.id} value={vendor.id}>
        {vendor.name}
      </option>
    );
  });
  return (
    <select
      value={vendorId}
      onChange={e => onChange(e.target.value)}
      className="form-control"
    >
      {options}
    </select>
  );
};

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
  const [vendorId, setVendorId] = useState("0");

  useEffect(() => {
    setEditTimestamp(new Date().toISOString());
  }, [invoiceRecords]);

  const defaultInvoiceRecord = {
    itemId: "",
    quantity: 0,
    cost: 0,
  };

  console.log(invoiceRecords);
  // selected vendor name
  const vendorName = props.vendors.find(
    (vendor) => vendor.id === vendorId
  ).name;
  console.log(vendorName);

  return (
    <React.Fragment>
      <FileLoader
        onLoad={setInvoiceRecords}
        subDirectory="invoice"
        fileName={props.invoiceId}
      />
      <VendorSelect
        vendors={props.vendors}
        vendorId={vendorId}
        onChange={setVendorId}
      />
      <Grid
        entityId={props.invoiceId}
        fields={fields}
        records={invoiceRecords}
        setRecords={setInvoiceRecords}
        defaultRecord={defaultInvoiceRecord}
        label="Invoice"
      />
      <SaveButton
        editTimestamp={editTimestamp}
        fileName={props.invoiceId}
        subDirectory="invoice"
        fileData={invoiceRecords}
        label="Save Invoice"
      />
    </React.Fragment>
  );
};

export default Invoice;
