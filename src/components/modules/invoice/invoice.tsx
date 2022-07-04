import React, { useState, useEffect } from "react";

import Grid from "../grid/grid";
import { Select } from "../atoms/select/select";
import SaveButton from "../save-button/save-button";
import FileLoader from "../file-loader/file-loader";
import { Field } from "../atoms/field/field";

/* eslint-disable */
const jsonData: {[key: number]: any} = {
  19: JSON.parse('{"data":{"id":19,"supplier_id":13,"supplier_name":"Amazon","supplier_invoice_id":"112-6972545-9965002","invoice_date":"2019-05-26","invoice_type_id":3,"invoice_type":"Credit","invoice_total":69.87,"accounting_date":"2019-05-26","invoice_records":[{"id":118,"invoice_id":19,"good_id":82,"quantity":1,"unit_price":69.87,"created_at":null,"updated_at":null}]}}'),
  20: JSON.parse('{"data":{"id":20,"supplier_id":14,"supplier_name":"Half-Peach Bakery","supplier_invoice_id":"396451","invoice_date":"2019-05-19","invoice_type_id":2,"invoice_type":"Check","invoice_total":221.25,"accounting_date":"2019-05-20","invoice_records":[{"id":119,"invoice_id":20,"good_id":83,"quantity":20,"unit_price":2},{"id":120,"invoice_id":20,"good_id":84,"quantity":15,"unit_price":3.75},{"id":121,"invoice_id":20,"good_id":85,"quantity":25,"unit_price":2},{"id":122,"invoice_id":20,"good_id":86,"quantity":25,"unit_price":1.5},{"id":123,"invoice_id":20,"good_id":87,"quantity":15,"unit_price":2.5}]}}'),
  22: JSON.parse('{"data":{"id":22,"supplier_id":3,"supplier_name":"Instant Whip","supplier_invoice_id":"1601695379","invoice_date":"2019-05-20","invoice_type_id":2,"invoice_type":"Check","invoice_total":338.87,"accounting_date":"2019-05-20","invoice_records":[{"id":124,"invoice_id":22,"good_id":89,"quantity":1,"unit_price":45.39},{"id":125,"invoice_id":22,"good_id":8,"quantity":4,"unit_price":8.25},{"id":126,"invoice_id":22,"good_id":9,"quantity":1,"unit_price":8.25},{"id":127,"invoice_id":22,"good_id":90,"quantity":1,"unit_price":9.25},{"id":128,"invoice_id":22,"good_id":91,"quantity":1,"unit_price":8.3},{"id":129,"invoice_id":22,"good_id":92,"quantity":5,"unit_price":21.2},{"id":130,"invoice_id":22,"good_id":93,"quantity":1,"unit_price":14.29},{"id":131,"invoice_id":22,"good_id":114,"quantity":2,"unit_price":14.81},{"id":132,"invoice_id":22,"good_id":10,"quantity":2,"unit_price":14.96},{"id":133,"invoice_id":22,"good_id":111,"quantity":1,"unit_price":24.6},{"id":134,"invoice_id":22,"good_id":112,"quantity":1,"unit_price":25.1},{"id":135,"invoice_id":22,"good_id":113,"quantity":1,"unit_price":5.15}]}}'),
};
/* eslint-enable */

interface InvoiceProps {
  invoiceId: number | null;
  vendors: any;
}

interface InvoiceRecordInterface {
  id: string | null;
  good_id: number;
  quantity: number;
  unit_price: number;
}

const fields = [
  {
    value: "",
    name: "good_id",
    type: "number",
    id: "good_id",
    label: "Good Id",
  },
  {
    value: "",
    name: "quantity",
    type: "number",
    id: "quantity",
    label: "Quantity",
  },
  {
    value: "",
    name: "unit_price",
    type: "number",
    id: "unit_price",
    label: "Cost per Unit",
  },
];

const Invoice = (props: InvoiceProps): JSX.Element => {
  const [editTimestamp, setEditTimestamp] = useState("");
  const [invoice, setInvoice] = useState<any>({ id: "" });

  useEffect(() => {
    if (props.invoiceId) {
      const invoice = jsonData[props.invoiceId].data;
      setInvoice(invoice);
      //setVendorId(invoice.supplier_id.toString());
    }
  }, [props.invoiceId]);

  useEffect(() => {
    setEditTimestamp(new Date().toISOString());
  }, [invoice]);

  const setInvoiceRecords = (invoiceRecords: InvoiceRecordInterface[]) => {
    setInvoice({ ...invoice, invoice_records: invoiceRecords });
  };

  const defaultInvoiceRecord = {
    good_id: 0,
    quantity: 0,
    unit_price: 0,
    invoice_id: invoice.id,
  };

  console.log(invoice.invoice_records);

  const headerChange = (key: string, value: string | number) => {
    console.log(key, value);
    setInvoice({ ...invoice, [key]: value });
  };

  if (invoice.id === "") {
    return <React.Fragment />;
  } else {
    return (
      <React.Fragment>
        <div>
          <Field
            value={invoice.supplier_invoice_id}
            name="supplier_invoice_id"
            type="text"
            id="supplier_invoice_id"
            onChange={headerChange}
            label="Supplier Invoice Id"
          />
          <Field
            value={invoice.invoice_date}
            name="invoice_date"
            type="date"
            id="invoice_date"
            onChange={headerChange}
            label="Invoice Date"
          />
          <Field
            value={invoice.accounting_date}
            name="accounting_date"
            type="date"
            id="accounting_date"
            onChange={headerChange}
            label="Accounting Date"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Select
            items={[{ id: invoice.supplier_id, name: invoice.supplier_name }]}
            selectedId={invoice.supplier_id}
            onChange={(value) => headerChange("supplier_id", value)}
          />
          <Select
            items={[
              {
                id: invoice.invoice_type_id,
                name: invoice.invoice_type,
              },
            ]}
            selectedId={invoice.invoice_type_id}
            onChange={(value) => headerChange("invoice_type_id", value)}
          />
        </div>
        <Grid
          entityId={invoice.id}
          fields={fields}
          records={invoice.invoice_records || []}
          setRecords={setInvoiceRecords}
          defaultRecord={defaultInvoiceRecord}
          label="Invoice"
        />
      </React.Fragment>
    );
  }
};

export default Invoice;

//      <FileLoader
//        onLoad={setInvoiceRecords}
//        subDirectory="invoice"
//        fileName={props.invoiceId}
//      />
//      <SaveButton
//        editTimestamp={editTimestamp}
//        fileName={props.invoiceId}
//        subDirectory="invoice"
//        fileData={invoiceRecords}
//        label="Save Invoice"
//      />
