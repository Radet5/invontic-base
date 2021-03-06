import React, { useState, useEffect } from "react";
import { FieldInterface } from "../../../modules/types/field-interface";
import { StyledReactSelect } from "../styled-react-select/styled-react-select";

import "./field.scss";

export const Field = ({
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
  max,
  min,
  step,
  hideValidLabel,
}: FieldInterface): JSX.Element => {
  const [colWidth, setColWidth] = useState(width ? width : 200 + "px");

  useEffect(() => {
    if (width) {
      setColWidth(width + "px");
    }
  }, [width]);

  const activeOrValidCSSTag = active ? " -active" : value ? " -valid" : "";
  const hideCSSTag = value && hideValidLabel ? " -hide" : "";

  const labelElm = (
    <label
      className={`a-field__label${activeOrValidCSSTag}${hideCSSTag}`}
      htmlFor={id}
    >
      {label}
    </label>
  );

  if (type === "reactSelect") {
    return (
      <div style={{ width: colWidth }} onKeyUp={onKeyUp} className="a-field">
        <StyledReactSelect
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
  } else if (type === "createSelect") {
    return (
      <div style={{ width: colWidth }} onKeyUp={onKeyUp} className="a-field">
        <StyledReactSelect
          value={value}
          name={name}
          id={id}
          onChange={onChange}
          onFocus={onFocus}
          fieldRef={fieldRef}
          options={options}
          createable={true}
        />
        {labelElm}
      </div>
    );
  } else {
    return (
      <div style={{ width: colWidth }} className="a-field">
        {labelElm}
        <input
          className={active ? "a-field__input -active" : "a-field__input"}
          type={type}
          name={name}
          value={value}
          id={id}
          ref={fieldRef}
          onChange={(e) => onChange(name, e.target.value)}
          onFocus={onFocus}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          required={type == "date"}
          max={max}
          min={min}
          step={step}
        />
      </div>
    );
  }
};
