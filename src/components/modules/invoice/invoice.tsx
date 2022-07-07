import React, { useState, useEffect } from "react";
import Grid from "../grid/grid";
import { Select } from "../atoms/select/select";
import { Field } from "../atoms/field/field";
import { InvoiceRecordSums } from "./record-sums/record-sums";
import { InvoiceTotals } from "./totals/totals";
import { InvoiceAggregates } from "./aggregates/aggregates";
import { FieldRow } from "../atoms/field-row/field-row";

interface InvoiceProps {
  invoice: any;
  updateInvoice: (key: string, value: any) => void;
  suppliers: Array<{ id: number; name: string }>;
  invoiceTypes: Array<{ id: number; name: string }>;
  goods: Array<any>;
}

interface InvoiceRecordInterface {
  id: string | null;
  good_id: number;
  quantity: number;
  unit_price: number;
}

const Invoice = ({
  invoice,
  updateInvoice,
  suppliers,
  invoiceTypes,
  goods,
}: InvoiceProps): JSX.Element => {
  const [fields, setFields] = useState<any>([]);

  useEffect(() => {
    if (invoice && invoice.id !== "") {
      setFields([
        {
          value: "",
          name: "quantity",
          type: "number",
          id: "quantity",
          label: "Quantity",
          width: 100,
        },
        {
          value: "",
          name: "unit_price",
          type: "number",
          id: "unit_price",
          label: "Cost per Unit",
          width: 100,
        },
        {
          value: "",
          name: "good_id",
          type: "reactSelect",
          id: "good_id_item_code",
          label: "Item Code",
          options: goods.map((good: any) => {
            return {
              value: good.id,
              label: good.item_code,
            };
          }),
        },
        {
          value: "",
          name: "good_id",
          type: "reactSelect",
          id: "good_id_name",
          label: "Good Name",
          options: goods.map((good: any) => {
            return {
              value: good.id,
              label: good.name,
            };
          }),
        },
      ]);
    }
  }, [goods, invoice]);

  const setInvoiceRecords = (invoiceRecords: InvoiceRecordInterface[]) => {
    updateInvoice("invoice_records", invoiceRecords);
  };

  const defaultInvoiceRecord = {
    good_id: 0,
    good_name: "",
    quantity: 0,
    unit_price: 0,
    invoice_id: invoice.id,
  };

  //console.log(invoice.invoice_records);

  const headerChange = (key: string, value: string | number) => {
    console.log(key, value);
    updateInvoice(key, value);
  };

  const supplierName = suppliers.find(
    (supplier: { id: number; name: string }) =>
      supplier.id === invoice.supplier_id
  )?.name;

  return (
    <React.Fragment>
      <div style={{ marginBottom: "2.5vh", fontSize: "32px" }}>
        {`${supplierName || "Supplier"} ${invoice.supplier_invoice_id}`}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <FieldRow>
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
          </FieldRow>
          <FieldRow>
            <Field
              name="supplier_id"
              type="reactSelect"
              id="supplier_id_name"
              label="Supplier"
              value={invoice.supplier_id}
              onChange={headerChange}
              options={suppliers.map((supplier: any) => {
                return {
                  value: supplier.id,
                  label: supplier.name,
                };
              })}
            />
            <div style={{ display: "flex", alignItems: "end" }}>
              <Select
                items={invoiceTypes}
                selectedId={invoice.invoice_type_id}
                onChange={(value) => headerChange("invoice_type_id", value)}
              />
            </div>
          </FieldRow>
        </div>
        <div
          style={{
            width: "fit-content",
            marginLeft: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <InvoiceTotals
            records={invoice.invoice_records || []}
            goods={goods}
          />
          <InvoiceAggregates
            records={invoice.invoice_records || []}
            goods={goods}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Grid
          entityId={invoice.id}
          fields={fields}
          records={invoice.invoice_records || []}
          setRecords={setInvoiceRecords}
          defaultRecord={defaultInvoiceRecord}
          label="Invoice"
        />
        <InvoiceRecordSums
          records={invoice.invoice_records || []}
          goods={goods}
        />
      </div>
    </React.Fragment>
  );
};

export default Invoice;
