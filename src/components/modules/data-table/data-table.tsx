import React, { useState } from "react";
import "./data-table.scss";

interface DisplayTableProps {
  data: any[];
  columns: any[];
  onRowClick?: (row: any) => void;
}

export const DataTable = ({
  data,
  columns,
  onRowClick,
}: DisplayTableProps): JSX.Element => {
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0);

  const handleRowClick = (row: any, index: number): void => {
    setSelectedRow(row);
    setSelectedRowIndex(index);
    if (onRowClick) {
      onRowClick(row);
    }
  };

  const handleRowDoubleClick = (row: any, index: number): void => {
    null;
  };

  const handleRowContextMenu = (row: any, index: number): void => {
    null;
  };

  return (
    <table className="o-data-table">
      <thead>
        <tr>
          {columns.map((column: any) => (
            <th key={column.id}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row: any, index: number) => (
          <tr
            key={row.id}
            onClick={() => handleRowClick(row, index)}
            onDoubleClick={() => handleRowDoubleClick(row, index)}
            onContextMenu={() => handleRowContextMenu(row, index)}
            className={`o-data-table__row${
              index === selectedRowIndex ? " o-data-table__row--selected" : ""
            }`}
          >
            {columns.map((column: any) => {
              let displayValue = row[column.id];
              if (column.operation) {
                displayValue = column.operation(row[column.id]);
              }
              return (
                <td className="o-data-table__cell" key={column.id}>
                  {displayValue}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
