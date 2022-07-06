import React, { useEffect, useState, useCallback } from "react";
import { FieldInterface } from "../../../types/field-interface";

import "./grid-record-field.scss";
import { GridSelect } from "./grid-select";

interface GridRecordFieldProps extends FieldInterface {
  onChange: (key: string, value: string | number) => void;
  onFocus: (id: string) => void;
  active: boolean;
  fieldRef: any;
  onKeyUp: (event: React.KeyboardEvent) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  options?: any;
}

const GridRecordField = ({
  value,
  name,
  label,
  type,
  id,
  width,
  options,
  onChange,
  onFocus,
  active,
  fieldRef,
  onKeyUp,
  onKeyDown,
}: GridRecordFieldProps): JSX.Element => {
  const [colWidth, setColWidth] = useState(width ? width : 200 + "px");

  useEffect(() => {
    if (width) {
      setColWidth(width + "px");
    }
  }, [width]);

  const labelElm = (
    <label
      className={
        active
          ? "m-gridRecordField__label -active"
          : value
          ? "m-gridRecordField__label -valid"
          : "m-gridRecordField__label"
      }
      htmlFor={id}
    >
      {label}
    </label>
  );

  if (type === "reactSelect") {
    return (
      <div
        style={{ width: colWidth }}
        onKeyUp={onKeyUp}
        className="m-gridRecordField"
      >
        <GridSelect
          value={value}
          name={name}
          id={id}
          onChange={onChange}
          onFocus={onFocus}
          fieldRef={fieldRef}
          options={options}
        />
        {labelElm}
      </div>
    );
  } else {
    return (
      <div style={{ width: colWidth }} className="m-gridRecordField">
        {labelElm}
        <input
          className={
            active
              ? "m-gridRecordField__input -active"
              : "m-gridRecordField__input"
          }
          type={type}
          name={name}
          value={value}
          id={id}
          ref={fieldRef}
          onChange={(e) => onChange(name, e.target.value)}
          onFocus={(e) => {
            e.target.select();
            onFocus(id);
          }}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
        />
      </div>
    );
  }
};

export default GridRecordField;
