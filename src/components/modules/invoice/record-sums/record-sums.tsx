import React from "react";
import { roundTwoDecimals } from "../../math";

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
  };

  const tableStyles = {
    color: "#04293A",
    fontWeight: 700,
    fontSize: "13px",
    borderSpacing: "0 21px",
  };

  return (
    <table style={tableStyles}>
      <tbody>
        {sums.map((sum) => {
          return (
            <tr key={sum.id + "sums"}>
              <td style={cellStyles}>${sum.extPrice}</td>
              <td style={cellStyles}>${sum.tax}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
