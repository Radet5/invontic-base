import React from "react";

import Invoice from "../invoice/invoice";
import FileList from "../file-list/file-list";

const InvonticBase = (): JSX.Element => {
  return (
    <div className="o-invonticBase">
      <div>Welcome to Invontic</div>
      <Invoice invoiceId="jf9283j" />
      <FileList fileType="invoice" />
    </div>
  );
};

export default InvonticBase;
