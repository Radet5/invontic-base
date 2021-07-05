import React, { createRef, useEffect, useRef, useState } from "react";

import InvoiceRecordInterface from "./invoice-record-interface";
import InvoiceRecordField from "./field/invoice-record-field";

import "./invoice-record.scss";

interface InvoiceRecordProps extends InvoiceRecordInterface {
  updateRecord: (key: string, value: string | number) => void;
  active: boolean;
  onFocus: () => void;
  moveToNextRecord: (itemId: string) => void;
  moveToPrevRecord: (itemId: string) => void;
  activeField: string;
  setActiveField: (id: string) => void;
}

const fields = ({ itemId, quantity, cost }: InvoiceRecordInterface) => {
  return [
    {
      value: itemId,
      name: "itemId",
      type: "text",
      id: "itemId",
      label: "Item Id",
    },
    {
      value: quantity,
      name: "quantity",
      type: "number",
      id: "quantity",
      label: "Quantity",
    },
    {
      value: cost,
      name: "cost",
      type: "number",
      id: "cost",
      label: "Cost per Unit",
    },
  ];
};

interface FieldInterface {
  value: string | number;
  name: string;
  type: string;
  id: string;
  label: string;
}

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

const getFirstFieldId = (fields: Array<FieldInterface>) => {
  return fields[0].id;
};

const InvoiceRecord = (props: InvoiceRecordProps): JSX.Element => {
  const fieldData = fields(props);
  const refObject: any = {};
  fieldData.forEach((field) => (refObject[field.id] = createRef()));
  const fieldRefs = useRef(refObject);

  useEffect(() => {
    props.active ? focus(props.activeField) : null;
  }, [props.active]);

  const onFocus = (id: string) => {
    props.setActiveField(id);
    props.onFocus();
  };

  const focus = (id: string) => {
    fieldRefs.current[id].current.focus();
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

  const handleKeyUp = (event: React.KeyboardEvent, id: string) => {
    console.log("hi");
    switch (event.key) {
      case "Enter":
        {
          event.preventDefault();
          const nextFieldId = getNextFieldId(fieldData, id);
          if (isLastField(fieldData, id)) {
            props.setActiveField(nextFieldId);
            props.moveToNextRecord(nextFieldId);
          } else {
            focus(nextFieldId);
          }
        }
        break;
      case "ArrowDown":
        {
          event.preventDefault();
          props.moveToNextRecord(props.activeField);
        }
        break;
      case "ArrowUp":
        {
          event.preventDefault();
          props.moveToPrevRecord(props.activeField);
        }
        break;
    }
  };

  const fieldElements = fieldData.map((field) => {
    return (
      <InvoiceRecordField
        key={`field-${field.id}`}
        {...field}
        onChange={props.updateRecord}
        onFocus={onFocus}
        active={props.active && field.id == props.activeField}
        fieldRef={fieldRefs.current[field.id]}
        onKeyUp={(e) => handleKeyUp(e, field.id)}
        onKeyDown={handleKeyDown}
      />
    );
  });

  const recordClass = props.active
    ? "m-invoiceRecord -active"
    : "m-invoiceRecord";

  return <div className={recordClass}>{fieldElements}</div>;
};

export default InvoiceRecord;
