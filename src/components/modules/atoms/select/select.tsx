import React from "react";

import "./select.scss";

interface SelectProps {
  selectedId: number | string | undefined;
  onChange: (value: number | string) => void;
  items: Array<{ id: number; name: string }>;
}

export const Select = ({
  selectedId,
  onChange,
  items,
}: SelectProps): JSX.Element => {
  const options = items.map((item) => {
    return (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    );
  });
  return (
    <select
      value={selectedId}
      onChange={(e) => onChange(e.target.value)}
      className="a-select"
    >
      {options}
    </select>
  );
};
