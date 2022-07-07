import React, { createRef, useEffect, useRef, useState } from "react";
import { FieldInterface } from "../../types/field-interface";
import { Field } from "../../atoms/field/field";
import { FieldRow } from "../../atoms/field-row/field-row";

interface GridRecordProps {
  record: any;
  updateRecord: (key: string, value: string | number) => void;
  active: boolean;
  onFocus: () => void;
  moveToNextRecord: () => void;
  moveToPrevRecord: () => void;
  activeField: string;
  setActiveField: (id: string) => void;
  fields: Array<FieldInterface>;
  hide?: boolean;
}

const injectValues = (
  fields: Array<FieldInterface>,
  record: any
): Array<FieldInterface> => {
  const newFields = [...fields];
  return newFields.map((field) => {
    const newField = { ...field };
    newField.value = record[field.name];
    return newField;
  });
};

const getFieldPosition = (
  fields: Array<FieldInterface>,
  currentFieldId: string
) => {
  return fields.findIndex((field) => {
    return field.id == currentFieldId;
  });
};

const isLastField = (fields: Array<FieldInterface>, currentFieldId: string) => {
  const currentPosition = getFieldPosition(fields, currentFieldId);
  return currentPosition == fields.length - 1;
};

const getNextFieldId = (
  fields: Array<FieldInterface>,
  currentFieldId: string
) => {
  const currentPosition = getFieldPosition(fields, currentFieldId);
  const nextPosistion = isLastField(fields, currentFieldId)
    ? 0
    : currentPosition + 1;
  return fields[nextPosistion].id;
};

const GridRecord = (props: GridRecordProps): JSX.Element => {
  const fieldData = injectValues(props.fields, props.record);
  const refObject: any = {};
  fieldData.forEach((field) => (refObject[field.id] = createRef()));
  const fieldRefs = useRef(refObject);

  useEffect(() => {
    props.active ? focus(props.activeField) : null;
  }, [props.active, props.activeField]);

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
    props.setActiveField(e.target.id);
    props.onFocus();
  };

  const focus = (id: string) => {
    if (fieldRefs.current[id]) {
      fieldRefs.current[id].current.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        break;

      case "ArrowUp":
        event.preventDefault();
        break;
    }
  };

  const limitedKeyUp = (event: React.KeyboardEvent, id: string) => {
    switch (event.key) {
      case "Enter":
        {
          event.preventDefault();
          const nextFieldId = getNextFieldId(fieldData, id);
          if (isLastField(fieldData, id)) {
            props.setActiveField(nextFieldId);
            props.moveToNextRecord();
          } else {
            focus(nextFieldId);
          }
        }
        break;
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent, id: string) => {
    switch (event.key) {
      case "Enter":
        {
          event.preventDefault();
          const nextFieldId = getNextFieldId(fieldData, id);
          if (isLastField(fieldData, id)) {
            props.setActiveField(nextFieldId);
            props.moveToNextRecord();
          } else {
            focus(nextFieldId);
          }
        }
        break;
      case "ArrowDown":
        {
          event.preventDefault();
          props.moveToNextRecord();
        }
        break;
      case "ArrowUp":
        {
          event.preventDefault();
          props.moveToPrevRecord();
        }
        break;
    }
  };

  const fieldElements = fieldData.map((field) => {
    return (
      <Field
        key={`field-${field.id}`}
        {...field}
        onChange={props.updateRecord}
        onFocus={onFocus}
        active={props.active && field.id == props.activeField}
        fieldRef={fieldRefs.current[field.id]}
        onKeyUp={(e) => {
          if (field.type != "reactSelect") {
            handleKeyUp(e, field.id);
          } else {
            limitedKeyUp(e, field.id);
          }
        }}
        onKeyDown={handleKeyDown}
      />
    );
  });

  return <FieldRow hide={props.hide}>{fieldElements}</FieldRow>;
};

export default GridRecord;
