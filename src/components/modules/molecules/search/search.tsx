import React, { Fragment, useEffect, useState } from "react";
import Fuse from "fuse.js";

interface SearchProps {
  items: any;
  dispatch: any;
  dispatchType: string;
  keys: Array<string>;
  setResults: (results: Array<string | number>) => void;
}

export const Search = ({
  items,
  dispatch,
  dispatchType,
  keys,
  setResults,
}: SearchProps): JSX.Element => {
  const [searchString, setSearchString] = useState<string>("");

  const fuseOptions = {
    includeScore: true,
    keys: keys,
    ignoreFieldNorm: true,
    ignoreLocation: true,
  };

  const fuse = new Fuse(items, fuseOptions);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const searchValue = e.target.value;
    setSearchString(searchValue);
    if (searchValue != "") {
      search(searchValue);
    } else {
      setResults([]);
    }
  };

  const search = (searchString: string) => {
    const res = fuse.search(searchString);
    const fuseScoreMap: { [key: string]: number } = {};
    res.forEach((item: any) => {
      fuseScoreMap[item.item.id] = item.score;
    });
    //console.log(res);
    const resIds = res.map((item: any) => item.item.id);

    dispatch({
      type: dispatchType,
      key: "fuseScore",
      id_value_map: fuseScoreMap,
    });

    setResults(resIds);
  };

  return (
    <Fragment>
      <input
        type="text"
        value={searchString}
        placeholder="search"
        onChange={onSearchChange}
        style={{ width: "80px" }}
      />
    </Fragment>
  );
};
