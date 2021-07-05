import React from "react";

import Invoice from "../invoice/invoice";

const InvonticBase = (): JSX.Element => {
  return (
    <div className="o-invonticBase">
      <div>Welcome to Invontic</div>
      <Invoice invoiceId="jf9283j" />
    </div>
  );
};

export default InvonticBase;
