import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Invoice from "../invoice/invoice";
import FileList from "../file-list/file-list";
import { Drawer } from "../drawer/drawer";
import { InvoiceNavigator } from "../invoice-navigator/invoice-navigator";
import { InvoiceManager } from "../invoice-manager/invoice-manager";

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
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(
    null
  );

  // generates a UUID for the invoice
  const generateInvoiceId = (): string => {
    return uuidv4();
  };

  return (
    <div className="o-invonticBase">
      {selectedInvoiceId ? null : <div>Invontic</div>}
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
        <Drawer defaultOpen={false}>
          <InvoiceNavigator onInvoiceSelect={setSelectedInvoiceId} />
        </Drawer>
        <div
          style={{
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Invoice vendors={vendors} invoiceId={selectedInvoiceId} />
        </div>
        <Drawer side="right">
          <FileList
            subDirectory="invoice"
            setSelectedFile={setSelectedInvoice}
          />
        </Drawer>
      </div>
    </div>
  );
};

export default InvonticBase;
