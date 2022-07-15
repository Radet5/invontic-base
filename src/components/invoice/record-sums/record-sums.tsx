import React, { Fragment } from "react";
import { roundTwoDecimals } from "../../../modules/math";

interface InvoiceRecordSumsProps {
  records: Array<any>;
  goods: Array<any>;
}

export const InvoiceRecordSums = ({
  records = [],
  goods = [],
}: InvoiceRecordSumsProps): JSX.Element => {
  const sums = records.map((record) => {
    const extPrice = record.quantity * record.unit_price;
    const good = goods.find((good) => good.id == record.good_id);
    const taxRate = good ? good.tax_rate : 0;
    const tax = extPrice * taxRate;
    return {
      id: record.id,
      extPrice: roundTwoDecimals(extPrice).toFixed(2),
      tax: roundTwoDecimals(tax).toFixed(2),
    };
  });

  const cellStyles = {
    verticalAlign: "bottom",
    padding: "0px 4px",
    border: "2px solid #04293A",
    backgroundColor: "#ECB365",
    minWidth: "68px",
  };

  const rowStyles = {
    height: "21px",
    display: "flex",
  };

  const tableStyles = {
    color: "#04293A",
    fontWeight: 700,
    fontSize: "13px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "21px",
    marginTop: "21px",
  };

  return (
    <div style={tableStyles}>
      {sums.map((sum) => {
        return (
          <Fragment key={sum.id + "sums"}>
            <div style={rowStyles}>
              <div style={cellStyles}>${sum.extPrice}</div>
              <div style={cellStyles}>${sum.tax}</div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};
