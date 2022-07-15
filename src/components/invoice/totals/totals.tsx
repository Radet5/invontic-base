import React from "react";
import { roundTwoDecimals } from "../../../modules/math";

interface InvoiceTotals {
  records: Array<any>;
  goods: Array<any>;
}

export const InvoiceTotals = ({
  records = [],
  goods = [],
}: InvoiceTotals): JSX.Element => {
  let subTotal = 0;
  let taxTotal = 0;
  const sums = records.forEach((record) => {
    const extPrice = record.quantity * record.unit_price;
    const good = goods.find((good) => good.id == record.good_id);
    const taxRate = good ? good.tax_rate : 0;
    const tax = extPrice * taxRate;
    subTotal += extPrice;
    taxTotal += tax;
  });

  const totals = [
    { id: "subTotal", value: roundTwoDecimals(subTotal).toFixed(2) },
    { id: "taxTotal", value: roundTwoDecimals(taxTotal).toFixed(2) },
    { id: "total", value: roundTwoDecimals(subTotal + taxTotal).toFixed(2) },
  ];

  const cellStyles = {
    verticalAlign: "bottom",
    padding: "0px 4px",
    border: "2px solid #04293A",
    backgroundColor: "#ECB365",
  };

  const tableStyles = {
    color: "#04293A",
    fontWeight: 700,
    fontSize: "13px",
    borderCollapse: "collapse" as const,
  };

  return (
    <table style={tableStyles}>
      <thead>
        <tr>
          <th style={cellStyles}>Sub Total</th>
          <th style={cellStyles}>Tax</th>
          <th style={cellStyles}>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {totals.map((total) => {
            return (
              <td key={total.id + "totals"} style={cellStyles}>
                ${total.value}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};
