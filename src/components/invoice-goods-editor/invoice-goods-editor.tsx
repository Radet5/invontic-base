import React, { useState, useEffect, Fragment } from "react";
import Grid from "../grid/grid";
import { Filter } from "../molecules/filter/filter";
import { Search } from "../molecules/search/search";
import { SortSelect } from "../molecules/sort-select/sort-select";

interface InvoiceGoodsEditorProps {
  isDisplayed: boolean;
  goods: Array<any>;
  dispatch: any;
  departments: Array<{ department: string }>;
}

export const InvoiceGoodsEditor = ({
  isDisplayed,
  goods,
  dispatch,
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
        dispatch={dispatch}
        dispatchType="SET_SEARCH_SCORES"
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
        dispatch={dispatch}
        dispatchType="SORT"
        sortOptions={sortOptions}
      />
      <Grid
        entityId="goods"
        fields={fields}
        records={goods}
        dispatch={dispatch}
        dispatchType="GOOD"
        defaultRecord={defaultGood}
        filterIds={filterIds}
        isDisplayed={isDisplayed}
      />
    </Fragment>
  );
};
