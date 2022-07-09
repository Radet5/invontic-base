import React, { useEffect, useState } from "react";
import { Select } from "../../atoms/select/select";

interface SortSelectProps {
  items: any;
  dispatch: any;
  dispatchType: string;
  sortOptions: Array<{ id: number | string; name: string }>;
}

export const SortSelect = ({
  items,
  dispatch,
  dispatchType,
  sortOptions,
}: SortSelectProps): JSX.Element => {
  const [selectedId, setSelectedId] = useState<number | string | undefined>();

  const onSelect = (value: string): void => {
    setSelectedId(value);
    sort(value);
  };

  const sort = (key: string | number, direction = "asc") => {
    const sort_function = (a: any, b: any) => {
      if (typeof a[key] === "string" && typeof b[key] === "string") {
        if (direction === "asc") {
          return a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1;
        } else {
          return a[key].toLowerCase() < b[key].toLowerCase() ? 1 : -1;
        }
      } else if (typeof a[key] === "number" && typeof b[key] === "number") {
        if (direction === "asc") {
          return a[key] > b[key] ? 1 : -1;
        } else {
          return a[key] < b[key] ? 1 : -1;
        }
      } else {
        return 0;
      }
    };
    dispatch({
      type: dispatchType,
      sort_function,
    });
  };

  const options = [{ id: "" as string | number, name: "--sort by--" }].concat(
    sortOptions
  );

  return <Select selectedId={selectedId} onChange={onSelect} items={options} />;
};
