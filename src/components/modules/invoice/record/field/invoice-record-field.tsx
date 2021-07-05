import React from "react";

interface ImportRecordFieldProps {
  type: string;
  value: string | number;
  name: string;
  id: string;
  label: string;
  onChange: (key: string, value: string | number) => void;
}

const ImportRecordField = (props: ImportRecordFieldProps): JSX.Element => {
  const update = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(key, event.target.value);
  };

  return (
    <div className="m-invoiceRecordField">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        id={props.id}
        onChange={(e) => update(props.name, e)}
      />
    </div>
  );
};

export default ImportRecordField;
