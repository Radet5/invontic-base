import React, { useState } from "react";
import "./data-table.scss";

type Datum = number | string | boolean | DataPoint;
type DataPoint = {
  id: number;
  [key: string]: Datum;
};

type DataHeader = {
  id: string;
  title: string;
  operation?: (value: any) => any;
};

interface DisplayTableProps {
  data: Array<DataPoint>;
  columns: Array<DataHeader>;
  onRowClick?: (row: DataPoint) => void;
}

export const DataTable = ({
  data,
  columns,
  onRowClick,
}: DisplayTableProps): JSX.Element => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);

  const handleRowClick = (row: DataPoint, index: number): void => {
    setSelectedRowIndex(index);
    if (onRowClick) {
      onRowClick(row);
    }
  };

  const handleRowDoubleClick = (row: DataPoint, index: number): void => {
    console.log("double click", row, index);
  };

  const handleRowContextMenu = (row: DataPoint, index: number): void => {
    console.log("context menu", row, index);
  };

  return (
    <table className="o-data-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.id}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row: DataPoint, index: number) => (
          <tr
            key={row.id}
            onClick={() => handleRowClick(row, index)}
            onDoubleClick={() => handleRowDoubleClick(row, index)}
            onContextMenu={() => handleRowContextMenu(row, index)}
            className={`o-data-table__row${
              index === selectedRowIndex ? " o-data-table__row--selected" : ""
            }`}
          >
            {columns.map((column) => {
              let displayValue = row[column.id];
              if (column.operation) {
                displayValue = column.operation(row[column.id]);
              }
              return (
                <td className="o-data-table__cell" key={column.id}>
                  {displayValue.toString()}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
