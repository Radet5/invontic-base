import React, { useState } from "react";

import InvoiceRecordInterface from "./record/invoice-record-interface";
import InvoiceRecord from "./record/invoice-record";

interface InvoiceProps {
  invoiceId: string;
}

const Invoice = (props: InvoiceProps): JSX.Element => {
  const [invoiceRecords, setInvoiceRecords] = useState<
    Array<InvoiceRecordInterface>
  >([]);

  const addRecord = () => {
    console.log("Hi?");
    const newRecord = {
      recordId: `${props.invoiceId}-${invoiceRecords.length}`,
      itemId: "",
      quantity: 0,
      cost: 0,
    };
    setInvoiceRecords([...invoiceRecords, newRecord]);
  };

  const updateInvoiceRecord = (index: number) => {
    return function (key: string, value: string | number) {
      const newRecords = [...invoiceRecords];
      newRecords[index] = { ...invoiceRecords[index], [key]: value };
      setInvoiceRecords(newRecords);
    };
  };

  return (
    <div className="o-invoice">
      <div>Invoice</div>
      {invoiceRecords.map((invoiceRecord, index) => {
        return (
          <InvoiceRecord
            {...invoiceRecord}
            updateRecord={updateInvoiceRecord(index)}
            key={`invoiceRecord-${invoiceRecord.recordId}`}
          />
        );
      })}
      <button onClick={addRecord}>Add Record</button>
    </div>
  );
};

export default Invoice;
