import React, { Fragment, useState } from "react";
import { Select } from "../../atoms/select/select";

interface FilterProps {
  items: any;
  filterOptions: Array<{ id: number | string; name: string }>;
  setResults: (results: Array<string | number>) => void;
}

export const Filter = ({
  items,
  filterOptions,
  setResults,
}: FilterProps): JSX.Element => {
  const [selectedKey, setSelectedKey] = useState<number | string>("0");
  const [filterString, setFilterString] = useState<string>("");

  const onSelectKey = (key: number | string): void => {
    setSelectedKey(key);
    if (key != "0" && filterString != "") {
      filter(key, filterString);
    } else {
      setResults([]);
    }
  };

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const filterValue = e.target.value;
    setFilterString(filterValue);
    if (selectedKey != "0" && filterValue != "") {
      filter(selectedKey, filterValue);
    } else {
      setResults([]);
    }
  };

  const filter = (key: string | number, searchString: string) => {
    const res = structuredClone(items);
    setResults(
      res
        .filter((item: any) => {
          if (key === "") {
            return true;
          }
          return item[key].toLowerCase().includes(searchString.toLowerCase());
        })
        .map((item: any) => item.id)
    );
  };

  const options = [{ id: "" as string | number, name: "--filter by--" }].concat(
    filterOptions
  );

  return (
    <Fragment>
      <input
        type="text"
        value={filterString}
        placeholder="filter"
        onChange={onFilterChange}
        style={{ width: "80px" }}
      />
      <Select selectedId={selectedKey} onChange={onSelectKey} items={options} />
    </Fragment>
  );
};
