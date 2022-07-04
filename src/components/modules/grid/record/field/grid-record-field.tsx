import React, { LegacyRef } from "react";

import "./grid-record-field.scss";

interface GridRecordFieldProps extends FieldInterface {
  onChange: (key: string, value: string | number) => void;
  onFocus: (id: string) => void;
  active: boolean;
  fieldRef: LegacyRef<HTMLInputElement>;
  onKeyUp: (event: React.KeyboardEvent) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}

const GridRecordField = (props: GridRecordFieldProps): JSX.Element => {
  const update = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(key, event.target.value);
  };

  return (
    <div className="m-gridRecordField">
      <label
        className={
          props.active
            ? "m-gridRecordField__label -active"
            : props.value
            ? "m-gridRecordField__label -valid"
            : "m-gridRecordField__label"
        }
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <input
        className={
          props.active
            ? "m-gridRecordField__input -active"
            : "m-gridRecordField__input"
        }
        type={props.type}
        name={props.name}
        value={props.value}
        id={props.id}
        ref={props.fieldRef}
        onChange={(e) => update(props.name, e)}
        onFocus={(e) => {
          e.target.select();
          props.onFocus(props.id);
        }}
        onKeyUp={props.onKeyUp}
        onKeyDown={props.onKeyDown}
      />
    </div>
  );
};

export default GridRecordField;
