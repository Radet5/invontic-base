import React, { useState, useEffect } from "react";

import GridRecord from "./record/grid-record";

interface GridProps {
  entityId: string;
  fields: Array<FieldInterface>;
  records: any;
  defaultRecord: any;
  label: string;
  setRecords: (records: any) => void;
}

const Grid = ({
  entityId,
  fields,
  records,
  defaultRecord,
  label,
  setRecords,
}: GridProps): JSX.Element => {
  const [activeField, setActiveField] = useState("itemId");
  const [activeRecord, setActiveRecord] = useState(-1);

  useEffect(() => {
    if (records.length == 0) {
      setRecords([{ ...defaultRecord, id: `${entityId}-0` }]);
    }
  }, [records, setRecords, defaultRecord, entityId]);

  const addRecord = () => {
    const newRecord = {
      ...defaultRecord,
      id: `${entityId}-${records.length}`,
    };
    setRecords([...records, newRecord]);
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

  const updateRecord = (index: number) => {
    return function (key: string, value: string | number) {
      const newRecords = [...records];
      newRecords[index] = { ...records[index], [key]: value };
      setRecords(newRecords);
    };
  };

  const recordElements = records.map((record: any, index: number) => {
    return (
      <GridRecord
        record={record}
        updateRecord={updateRecord(index)}
        active={activeRecord == index}
        onFocus={() => focus(index)}
        key={`gridRecord-${record.id}`}
        moveToNextRecord={moveToNextRecord}
        moveToPrevRecord={moveToPrevRecord}
        activeField={activeField}
        setActiveField={setActiveField}
        fields={fields}
      />
    );
  });

  return (
    <div className="o-grid">
      {recordElements}
      <button onClick={addRecord}>Add Record</button>
    </div>
  );
};

export default Grid;
