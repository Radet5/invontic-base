import React, { useState } from "react";

import InvoiceRecordInterface from "./record/invoice-record-interface";
import InvoiceRecord from "./record/invoice-record";

interface InvoiceProps {
  invoiceId: string;
}

const Invoice = (props: InvoiceProps): JSX.Element => {
  const [activeField, setActiveField] = useState("itemId");
  const [invoiceRecords, setInvoiceRecords] = useState<
    Array<InvoiceRecordInterface>
  >([]);
  const [activeRecord, setActiveRecord] = useState(-1);

  const addRecord = () => {
    console.log("Hi?");
    const newRecord = {
      recordId: `${props.invoiceId}-${invoiceRecords.length}`,
      itemId: "",
      quantity: 0,
      cost: 0,
    };
    setInvoiceRecords([...invoiceRecords, newRecord]);
    focus(invoiceRecords.length);
  };

  const moveToPrevRecord = (itemId: string) => {
    if (activeRecord > 0) {
      focus(activeRecord - 1);
    }
  };

  const moveToNextRecord = (itemId: string) => {
    if (activeRecord > -1 && activeRecord < invoiceRecords.length - 1) {
      focus(activeRecord + 1);
    } else if (activeRecord == invoiceRecords.length - 1) {
      addRecord();
    }
  };

  const focus = (id: number) => {
    setActiveRecord(id);
  };

  const updateInvoiceRecord = (index: number) => {
    return function (key: string, value: string | number) {
      const newRecords = [...invoiceRecords];
      newRecords[index] = { ...invoiceRecords[index], [key]: value };
      setInvoiceRecords(newRecords);
    };
  };

  const recordElements = invoiceRecords.map((invoiceRecord, index) => {
    return (
      <InvoiceRecord
        {...invoiceRecord}
        updateRecord={updateInvoiceRecord(index)}
        active={activeRecord == index}
        onFocus={() => focus(index)}
        key={`invoiceRecord-${invoiceRecord.recordId}`}
        moveToNextRecord={moveToNextRecord}
        moveToPrevRecord={moveToPrevRecord}
        activeField={activeField}
        setActiveField={setActiveField}
      />
    );
  });

  return (
    <div className="o-invoice">
      <div>Invoice</div>
      {recordElements}
      <button onClick={addRecord}>Add Record</button>
    </div>
  );
};

export default Invoice;
