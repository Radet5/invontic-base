import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Invoice from "../invoice/invoice";
import FileList from "../file-list/file-list";
import { Drawer } from "../drawer/drawer";

const vendors = [
  { id: "0", name: "Vendor A" },
  { id: "1", name: "Vendor B" },
  { id: "2", name: "Vendor C" },
  { id: "3", name: "Vendor D" },
  { id: "4", name: "Vendor E" },
  { id: "5", name: "Vendor F" },
];

const InvonticBase = (): JSX.Element => {
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  // generates a UUID for the invoice
  const generateInvoiceId = (): string => {
    return uuidv4();
  };

  return (
    <div className="o-invonticBase">
      <div>Welcome to Invontic</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "fit-content",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <Drawer>
          <FileList
            subDirectory="invoice"
            setSelectedFile={setSelectedInvoice}
          />
        </Drawer>
        <div
          style={{
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {selectedInvoice ? (
            <Invoice vendors={vendors} invoiceId={selectedInvoice} />
          ) : null}
          <button onClick={() => setSelectedInvoice(generateInvoiceId())}>
            New Invoice
          </button>
        </div>
        <Drawer side="right">
          Oh there&apos;s stuff in here too like ots and lots of stuff wow!
        </Drawer>
      </div>
    </div>
  );
};

export default InvonticBase;
