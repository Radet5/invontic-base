import React, { useState } from "react";

import GridRecordInterface from "./record/grid-record-interface";
import { FieldInterface } from "./record/grid-record";
import GridRecord from "./record/grid-record";

interface GridProps {
  entityId: string;
  fields: Array<FieldInterface>;
  records: any;
  setRecords: (records: any) => void;
}

const Grid = (props: GridProps): JSX.Element => {
  const [activeField, setActiveField] = useState("itemId");
  const [activeRecord, setActiveRecord] = useState(-1);

  const addRecord = () => {
    const newRecord = {
      recordId: `${props.entityId}-${props.records.length}`,
      itemId: "",
      quantity: 0,
      cost: 0,
    };
    props.setRecords([...props.records, newRecord]);
    focus(props.records.length);
  };

  const moveToPrevRecord = () => {
    if (activeRecord > 0) {
      focus(activeRecord - 1);
    }
  };

  const moveToNextRecord = () => {
    if (activeRecord > -1 && activeRecord < props.records.length - 1) {
      focus(activeRecord + 1);
    } else if (activeRecord == props.records.length - 1) {
      addRecord();
    }
  };

  const focus = (id: number) => {
    setActiveRecord(id);
  };

  const updateRecord = (index: number) => {
    return function (key: string, value: string | number) {
      const newRecords = [...props.records];
      newRecords[index] = { ...props.records[index], [key]: value };
      props.setRecords(newRecords);
    };
  };

  const recordElements = props.records.map((record: any, index: number) => {
    return (
      <GridRecord
        record={record}
        updateRecord={updateRecord(index)}
        active={activeRecord == index}
        onFocus={() => focus(index)}
        key={`gridRecord-${record.recordId}`}
        moveToNextRecord={moveToNextRecord}
        moveToPrevRecord={moveToPrevRecord}
        activeField={activeField}
        setActiveField={setActiveField}
        fields={props.fields}
      />
    );
  });

  return (
    <div className="o-grid">
      <div>Grid</div>
      {recordElements}
      <button onClick={addRecord}>Add Record</button>
    </div>
  );
};

export default Grid;
