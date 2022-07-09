import React from "react";
import axios from "axios";
import { DataTable } from "../data-table/data-table";
import { roundTwoDecimals } from "../math";

import "./invoice-navigator.scss";

/* eslint-disable */
const jsonData =
  '{"data":[{"id":19,"supplier_id":13,"supplier_name":"Amazon","supplier_invoice_id":"112-6972545-9965002","invoice_date":"2019-05-26","invoice_type_id":3,"invoice_type":"Credit","invoice_total":69.87,"accounting_date":"2019-05-26"},{"id":20,"supplier_id":14,"supplier_name":"Half-Peach Bakery","supplier_invoice_id":"396451","invoice_date":"2019-05-19","invoice_type_id":2,"invoice_type":"Check","invoice_total":221.25,"accounting_date":"2019-05-20"},{"id":22,"supplier_id":3,"supplier_name":"Instant Whip","supplier_invoice_id":"1601695379","invoice_date":"2019-05-20","invoice_type_id":2,"invoice_type":"Check","invoice_total":338.87,"accounting_date":"2019-05-20"},{"id":23,"supplier_id":15,"supplier_name":"Waste Management","supplier_invoice_id":"5945017-0481-3","invoice_date":"2019-05-16","invoice_type_id":4,"invoice_type":"Open","invoice_total":618.74,"accounting_date":"2019-05-20"},{"id":24,"supplier_id":72,"supplier_name":"Old Town","supplier_invoice_id":"12\/23\/19","invoice_date":"2019-12-23","invoice_type_id":3,"invoice_type":"Credit","invoice_total":15.4654,"accounting_date":"2019-12-23"},{"id":25,"supplier_id":9,"supplier_name":"Heidelberg Distributing","supplier_invoice_id":"124799835","invoice_date":"2019-05-13","invoice_type_id":4,"invoice_type":"Open","invoice_total":127.13640000000002,"accounting_date":"2019-05-20"},{"id":26,"supplier_id":17,"supplier_name":"Wiltshire Pantry","supplier_invoice_id":"E21141","invoice_date":"2019-05-18","invoice_type_id":4,"invoice_type":"Open","invoice_total":561,"accounting_date":"2019-05-22"},{"id":27,"supplier_id":18,"supplier_name":"Trompeter","supplier_invoice_id":"29416","invoice_date":"2019-05-22","invoice_type_id":4,"invoice_type":"Open","invoice_total":306.26000000000005,"accounting_date":"2019-05-22"},{"id":28,"supplier_id":2,"supplier_name":"Creation Gardens","supplier_invoice_id":"5171757","invoice_date":"2019-05-23","invoice_type_id":4,"invoice_type":"Open","invoice_total":523.37,"accounting_date":"2019-05-23"},{"id":29,"supplier_id":19,"supplier_name":"Sitex","supplier_invoice_id":"2612262","invoice_date":"2019-05-23","invoice_type_id":4,"invoice_type":"Open","invoice_total":127.836,"accounting_date":"2019-05-23"}],"links":{"first":"http:\/\/127.0.0.1:8000\/api\/organizations\/1\/invoices?page=1","last":"http:\/\/127.0.0.1:8000\/api\/organizations\/1\/invoices?page=203","prev":"http:\/\/127.0.0.1:8000\/api\/organizations\/1\/invoices?page=1","next":"http:\/\/127.0.0.1:8000\/api\/organizations\/1\/invoices?page=3"},"meta":{"current_page":2,"from":11,"last_page":203,"links":[{"url":"http:\/\/127.0.0.1:8000\/api\/organizations\/1\/invoices?page=1","label":"&laquo; Previous","active":false},{"url":"http:\/\/127.0.0.1:8000\/api\/organizations\/1\/invoices?page=1","label":"1","active":false},{"url":"http:\/\/127.0.0.1:8000\/api\/organizations\/1\/invoices?page=2","label":"2","active":true},{"url":"http:\/\/127.0.0.1:8000\/api\/organizations\/1\/invoices?page=3","label":"3","active":false},{"url":"http:\/\/127.0.0.1:8000\/api\/organizations\/1\/invoices?page=4","label":"4","active":false},{"url":"http:\/\/127.0.0.1:8000\/api\/organizations\/1\/invoices?page=5","label":"5","active":false},{"url":"http:\/\/127.0.0.1:8000\/api\/organizations\/1\/invoices?page=6","label":"6","active":false},{"url":"http:\/\/127.0.0.1:8000\/api\/organizations\/1\/invoices?page=7","label":"7","active":false},{"url":"http:\/\/127.0.0.1:8000\/api\/organizations\/1\/invoices?page=8","label":"8","active":false},{"url":"http:\/\/127.0.0.1:8000\/api\/organizations\/1\/invoices?page=9","label":"9","active":false},{"url":"http:\/\/127.0.0.1:8000\/api\/organizations\/1\/invoices?page=10","label":"10","active":false},{"url":null,"label":"...","active":false},{"url":"http:\/\/127.0.0.1:8000\/api\/organizations\/1\/invoices?page=202","label":"202","active":false},{"url":"http:\/\/127.0.0.1:8000\/api\/organizations\/1\/invoices?page=203","label":"203","active":false},{"url":"http:\/\/127.0.0.1:8000\/api\/organizations\/1\/invoices?page=3","label":"Next &raquo;","active":false}],"path":"http:\/\/127.0.0.1:8000\/api\/organizations\/1\/invoices","per_page":10,"to":20,"total":2025}}';
/* eslint-enable */
//round(value, 2);

interface InvoiceNavigatorProps {
  dispatch: React.Dispatch<any>;
  invoices: { [key: number]: any };
}

const baseUrl = process.env.API_URL;

const retrieveInvoice = (id: number) => {
  return axios
    .get(`${baseUrl}invoices/${id}`)
    .then((res) => res.data.data);
};

export const InvoiceNavigator = ({
  dispatch,
  invoices,
}: InvoiceNavigatorProps): JSX.Element => {
  const columns = [
    { id: "supplier_name", title: "Supplier" },
    { id: "supplier_invoice_id", title: "Supplier Invoice ID" },
    { id: "invoice_date", title: "Invoice Date" },
    { id: "accounting_date", title: "Accounting Date" },
    { id: "invoice_type", title: "Invoice Type" },
    {
      id: "invoice_total",
      title: "Invoice Total",
      operation: (value: number) => roundTwoDecimals(value),
    },
  ];

  const selectInvoice = (id: number) => {
    if (invoices[id]) {
      dispatch({ type: "SELECT", id });
    } else {
      retrieveInvoice(id)
        .then((invoice) => {
          dispatch({ type: "ADD_INVOICE", invoice });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          dispatch({ type: "SELECT", id });
        });
    }
  };

  return (
    <div className="o-invoice-navigator">
      <DataTable
        data={JSON.parse(jsonData).data}
        columns={columns}
        onRowClick={(row) => selectInvoice(row.id)}
      />
    </div>
  );
};
