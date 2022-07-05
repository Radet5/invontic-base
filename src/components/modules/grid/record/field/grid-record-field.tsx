import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";

import "./grid-record-field.scss";

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
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [colWidth, setColWidth] = useState("200px");

  useEffect(() => {
    if (width) {
      setColWidth(width + "px");
    }
  }, [width]);

  useEffect(() => {
    if (value && options) {
      setSelectedOption(options.find((option) => option.value === value));
    }
  }, [value, options]);

  useEffect(() => {
    if (selectedOption) {
      onChange(name, selectedOption.value);
    }
  }, [selectedOption]);

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      position: "absolute",
      width: "100%",
      bottom: "0",
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#064663",
      border: "solid 2px #04293A",
      boxShadow: "none",
      borderRadius: "0px",
      padding: "0px",
      margin: "0px",
      outline: "none",
      cursor: "pointer",
      position: "relative",
      fontSize: "small",
      minHeight: "21px",
      height: "21px",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "white",
    }),
    input: (provided, state) => ({
      ...provided,
      color: "white",
      margin: "0px",
      padding: "0px",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      padding: "0px",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "21px",
      display: "none",
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      margin: "2px",
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "#064663",
      fontSize: "small",
    }),
    option: (provided, state) => ({
      ...provided,
      "&:hover": {
        backgroundColor: "#04293A",
      },
      backgroundColor: state.isFocused ? "#04293A" : null,
    }),
  };
  if (type === "reactSelect") {
    return (
      <div style={{ width: colWidth }} onKeyUp={onKeyUp} className="m-gridRecordField">
        <ReactSelect
          value={selectedOption}
          options={options}
          onChange={setSelectedOption}
          ref={fieldRef}
          styles={customStyles}
          onFocus={(e) => {
            e.target.select();
            onFocus(id);
          }}
          menuPosition="fixed"
          placeholder={null}
        />
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
      </div>
    );
  } else {
    return (
      <div style={{ width: colWidth }} className="m-gridRecordField">
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
