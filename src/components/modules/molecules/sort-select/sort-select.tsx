import React, { useState } from "react";
import { Select } from "../../atoms/select/select";

interface SortSelectProps {
  items: any;
  setItems: (items: any) => void;
  sortOptions: Array<{ id: number | string; name: string }>;
}

export const SortSelect = ({
  items,
  setItems,
  sortOptions,
}: SortSelectProps): JSX.Element => {
  const [selectedId, setSelectedId] = useState<number | string | undefined>();

  const onSelect = (value: string): void => {
    setSelectedId(value);
    sort(value);
  };

  const sort = (key: string, direction = "asc") => {
    const newItems = structuredClone(items);
    setItems(
      newItems.sort((a: any, b: any) => {
        if (direction === "asc") {
          return a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1;
        } else {
          return a[key].toLowerCase() < b[key].toLowerCase() ? 1 : -1;
        }
      })
    );
  };

  const options = [{ id: "" as string | number, name: "--sort by--" }].concat(
    sortOptions
  );

  return <Select selectedId={selectedId} onChange={onSelect} items={options} />;
};
