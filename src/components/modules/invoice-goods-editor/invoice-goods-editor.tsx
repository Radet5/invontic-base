import React, { useState, useEffect, Fragment } from "react";
import { Select } from "../atoms/select/select";
import Grid from "../grid/grid";
import { Filter } from "../molecules/filter/filter";
import { Search } from "../molecules/search/search";
import { SortSelect } from "../molecules/sort-select/sort-select";

interface InvoiceGoodsEditorProps {
  goods: Array<any>;
  setGoods: (goods: Array<any>) => void;
  departments: Array<{ department: string }>;
}

export const InvoiceGoodsEditor = ({
  goods,
  setGoods,
  departments,
}: InvoiceGoodsEditorProps): JSX.Element => {
  const [fields, setFields] = useState<any>([]);
  const [filterResults, setFilterResults] = useState<any>([]);
  const [searchResults, setSearchResults] = useState<any>([]);

  useEffect(() => {
    setFields([
      {
        value: "",
        name: "name",
        type: "text",
        id: "name",
        label: "Name",
      },
      {
        value: "",
        name: "item_code",
        type: "text",
        id: "item_code",
        label: "Item Code",
      },
      {
        value: "",
        name: "department",
        type: "createSelect",
        id: "department",
        label: "Department",
        options: departments.map((department: any) => {
          return {
            value: department.department,
            label: department.department,
          };
        }),
      },
      {
        value: "",
        name: "tax_rate",
        type: "number",
        id: "tax_rate",
        label: "Tax Rate",
      },
    ]);
  }, [departments]);

  const defaultGood = {
    name: "",
    item_code: "",
    department: "",
    tax_rate: 0,
  };

  const sortOptions = fields.map((field: any) => {
    return {
      id: field.name,
      name: field.label,
    };
  });

  sortOptions.push({ id: "fuseScore", name: "Search Relavance" });

  const filterOptions = [{ id: "department", name: "Department" }];

  let filterIds;
  if (filterResults.length > 0 && searchResults.length > 0) {
    filterIds = searchResults.filter((searchResult: any) => {
      return filterResults.includes(searchResult);
    });
  } else if (filterResults.length > 0) {
    filterIds = filterResults;
  } else if (searchResults.length > 0) {
    filterIds = searchResults;
  } else {
    filterIds = [];
  }

  return (
    <Fragment>
      <Search
        items={goods}
        setItems={setGoods}
        keys={["name", "item_code"]}
        setResults={setSearchResults}
      />
      <Filter
        items={goods}
        setResults={setFilterResults}
        filterOptions={filterOptions}
      />
      <SortSelect
        items={goods}
        setItems={setGoods}
        sortOptions={sortOptions}
        searchResults={searchResults}
      />
      <Grid
        entityId="goods"
        fields={fields}
        records={goods}
        setRecords={setGoods}
        defaultRecord={defaultGood}
        label="Goods"
        filterIds={filterIds}
      />
    </Fragment>
  );
};
