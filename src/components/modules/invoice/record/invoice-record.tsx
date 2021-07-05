import React from "react";

import InvoiceRecordInterface from "./invoice-record-interface";
import InvoiceRecordField from "./field/invoice-record-field";

interface InvoiceRecordProps extends InvoiceRecordInterface {
  updateRecord: (key: string, value: string | number) => void;
}

const InvoiceRecord = (props: InvoiceRecordProps): JSX.Element => {
  return (
    <div className="m-invoiceRecord">
      <InvoiceRecordField
        value={props.itemId}
        name="itemId"
        type="text"
        id="itemId"
        label="Item Id"
        onChange={props.updateRecord}
      />
      <InvoiceRecordField
        value={props.quantity}
        name="quantity"
        type="number"
        id="quantity"
        label="Quantity"
        onChange={props.updateRecord}
      />
      <InvoiceRecordField
        value={props.cost}
        name="cost"
        type="number"
        id="cost"
        label="Cost per Unit"
        onChange={props.updateRecord}
      />
    </div>
  );
};

export default InvoiceRecord;
