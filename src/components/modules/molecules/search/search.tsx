import React, { Fragment, useEffect, useState } from "react";
import Fuse from "fuse.js";

interface SearchProps {
  items: any;
  setItems: (items: any) => void;
  keys: Array<string>;
  setResults: (results: Array<string | number>) => void;
}

export const Search = ({
  items,
  setItems,
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
    const fuseScores = res.map((item: any) => {
      return { id: item.item.id, score: item.score };
    });
    //console.log(res);
    const resIds = res.map((item: any) => item.item.id);

    const newItems = structuredClone(items);
    setItems(
      newItems.map((item: any) => {
        const itemId = item.id;
        const fuseScoreObj = fuseScores.find(
          (score: any) => score.id === itemId
        );
        const fuseScore = fuseScoreObj ? fuseScoreObj.score : 1;
        return { ...item, fuseScore: fuseScore };
      })
    );

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
