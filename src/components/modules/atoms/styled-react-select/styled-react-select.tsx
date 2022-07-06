import React, { useState, useEffect } from "react";
import ReactSelect from "react-select";

interface StyledReactSelectProps {
  id: string;
  value: string | number;
  name: string;
  onChange: (key: string, value: string | number) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  fieldRef: any;
  options: any;
}

export const StyledReactSelect = ({
  id,
  name,
  value,
  onChange,
  onFocus,
  fieldRef,
  options,
}: StyledReactSelectProps): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const selectOption = (option: { value: string; label: string }) => {
    setSelectedOption(option);
    if (option) {
      onChange(name, option.value);
    }
  };

  useEffect(() => {
    if (value && options) {
      setSelectedOption(
        options.find(
          (option: { value: string; label: string }) => option.value === value
        )
      );
    }
  }, [value, options]);

  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: "100%",
      bottom: "0",
    }),
    control: (provided: any) => ({
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
    singleValue: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    input: (provided: any) => ({
      ...provided,
      color: "white",
      margin: "0px",
      padding: "0px",
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: "0px",
      textAlign: "left",
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: "21px",
      display: "none",
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      margin: "2px",
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#064663",
      fontSize: "small",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      "&:hover": {
        backgroundColor: "#04293A",
      },
      backgroundColor: state.isFocused ? "#04293A" : null,
    }),
  };

  return (
    <ReactSelect
      value={selectedOption}
      options={options}
      onChange={selectOption}
      ref={fieldRef}
      styles={customStyles}
      onFocus={onFocus}
      menuPosition="fixed"
      placeholder={null}
    />
  );
};
