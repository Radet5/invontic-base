import React, { useState, useEffect } from "react";
import { FieldInterface } from "../../modules/types/field-interface";
import GridRecord from "./record/grid-record";
import "./grid.scss";

interface GridProps {
  entityId: string;
  fields: Array<FieldInterface>;
  records: any;
  defaultRecord: any;
  dispatch: any;
  dispatchType: string;
  filterIds?: Array<string | number>;
  isDisplayed?: boolean;
}

const Grid = ({
  entityId,
  fields,
  records,
  defaultRecord,
  dispatch,
  dispatchType,
  filterIds,
  isDisplayed,
}: GridProps): JSX.Element => {
  const [activeField, setActiveField] = useState("itemId");
  const [activeRecord, setActiveRecord] = useState(-1);

  useEffect(() => {
    if (!isDisplayed) {
      setActiveField("itemId");
      setActiveRecord(-1);
      (document.activeElement as HTMLElement).blur();
    }
  }, [isDisplayed]);

  const addRecord = () => {
    const newRecord = {
      ...defaultRecord,
      id: `${entityId}-${records.length}`,
    };
    dispatch({
      type: "ADD_" + dispatchType,
      payload: newRecord,
    });
    focus(records.length);
  };

  const moveToPrevRecord = () => {
    if (activeRecord > 0) {
      focus(activeRecord - 1);
    }
  };

  const moveToNextRecord = () => {
    if (activeRecord > -1 && activeRecord < records.length - 1) {
      focus(activeRecord + 1);
    } else if (activeRecord == records.length - 1) {
      addRecord();
    }
  };

  const focus = (id: number) => {
    setActiveRecord(id);
  };

  const updateRecord = (id: number) => {
    return function (key: string, value: string | number) {
      dispatch({
        type: "UPDATE_" + dispatchType,
        id,
        key,
        value,
      });
    };
  };

  const recordElements = records?.map((record: any, index: number) => {
    return (
      <GridRecord
        record={record}
        recordIndex={index}
        updateRecord={updateRecord(record.id)}
        active={activeRecord == index}
        onFocus={() => focus(index)}
        key={`gridRecord-${record.id}`}
        moveToNextRecord={moveToNextRecord}
        moveToPrevRecord={moveToPrevRecord}
        activeField={activeField}
        setActiveField={setActiveField}
        fields={fields}
        hide={
          filterIds && filterIds.length > 0 && !filterIds.includes(record.id)
        }
      />
    );
  });

  return (
    <div className="o-grid">
      {recordElements}
      <button onClick={addRecord}>+</button>
    </div>
  );
};

export default Grid;
