import React, { Fragment } from "react";
import { roundTwoDecimals } from "../../math";

interface InvoiceAggregates {
  records: Array<any>;
  goods: Array<any>;
}

export const InvoiceAggregates = ({
  records = [],
  goods = [],
}: InvoiceAggregates): JSX.Element => {
  const departments = records.reduce((acc, record) => {
    const extPrice = record.quantity * record.unit_price;
    const good = goods.find((good) => good.id == record.good_id);
    if (!good) return acc;
    const department = good ? good.department : "Misc";
    const taxRate = good ? good.tax_rate : 0;
    const tax = extPrice * taxRate;
    const sum = extPrice + tax;
    if (acc[department]) {
      acc[department] += sum;
    } else {
      acc[department] = sum;
    }
    return acc;
  }, {});

  const departmentList = Object.keys(departments).sort();

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
          <th style={cellStyles}>Department</th>
          <th style={cellStyles}>Total</th>
        </tr>
      </thead>
      <tbody>
        {departmentList.map((departmentName: string) => {
          return (
            <tr key={departmentName + "total"}>
              <td style={cellStyles}>{departmentName}</td>
              <td style={cellStyles}>
                {roundTwoDecimals(departments[departmentName]).toFixed(2)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
