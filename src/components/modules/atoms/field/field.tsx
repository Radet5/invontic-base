import React from "react";
import { FieldInterface } from "../../types/field-interface";

import "./field.scss";

interface FieldProps extends FieldInterface {
  onChange: (key: string, value: string | number) => void;
  active?: boolean;
}

export const Field = (props: FieldProps): JSX.Element => {
  const update = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(key, event.target.value);
  };

  return (
    <div className="a-field">
      <label
        className={
          props.active
            ? "a-field__label -active"
            : props.value
            ? "a-field__label -valid"
            : "a-field__label"
        }
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <input
        className={props.active ? "a-field__input -active" : "a-field__input"}
        type={props.type}
        name={props.name}
        value={props.value}
        id={props.id}
        onChange={(e) => update(props.name, e)}
      />
    </div>
  );
};
