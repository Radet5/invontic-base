import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "../../atoms/data-table/data-table";
import { roundTwoDecimals } from "../../../modules/math";
import { useApi } from "../../hooks/api";
import { UserContext } from "../../context/user";

import "./invoice-navigator.scss";
import { Field } from "../../atoms/field/field";

interface InvoiceNavigatorProps {
  dispatch: React.Dispatch<any>;
  invoices: { [key: number]: any };
}

const baseUrl = process.env.API_URL;

const retrieveInvoice = (id: number) => {
  return axios.get(`${baseUrl}invoices/${id}`).then((res) => res.data.data);
};

export const InvoiceNavigator = ({
  dispatch,
  invoices,
}: InvoiceNavigatorProps): JSX.Element => {
  const [{ isLoading, isError, data }, fetch, setPayload] = useApi({
    initialUrl: "",
  });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const userContext = useContext(UserContext);

  //console.log(data);

  useEffect(() => {
    if (userContext?.organization_id) {
      fetch(`${baseUrl}organizations/${userContext.organization_id}/invoices`);
    }
  }, [userContext, fetch]);

  useEffect(() => {
    if (userContext?.organization_id && page > 0) {
      fetch(
        `${baseUrl}organizations/${userContext.organization_id}/invoices?page=${page}&per_page=${perPage}`
      );
    }
  }, [userContext, page, perPage, fetch]);

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

  const wasMoreThanFiveMinutesAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diff = now.getTime() - then.getTime();
    return diff > 5 * 60 * 1000;
  };

  const selectInvoice = (id: number) => {
    if (invoices[id] && !wasMoreThanFiveMinutesAgo(invoices[id].updated_at)) {
      dispatch({ type: "SELECT", id });
    } else {
      retrieveInvoice(id)
        .then((invoice) => {
          dispatch({ type: "ADD_INVOICE", invoice });
          dispatch({ type: "SELECT", id });
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            dispatch({ type: "ERROR", error: err.response.data.message });
          }
        });
    }
  };

  return (
    <div className="m-invoice-navigator">
      <div className="m-invoice-navigator__control">
        <div className="m-invoice-navigator__control__page-number">
          <Field
            id={"page-number"}
            label="Page"
            type="number"
            name="page"
            value={page || ""}
            width={50}
            max={data?.meta?.last_page || 1}
            min={1}
            onChange={(name, value) => setPage(parseInt(value))}
          />
          <div>of {data?.meta?.last_page}</div>
        </div>
        <div>
          <Field
            id={"per-page"}
            label="Per Page"
            type="number"
            name="per-page"
            value={perPage || ""}
            width={50}
            max={100}
            min={1}
            onChange={(name, value) => setPerPage(parseInt(value))}
          />
        </div>
      </div>
      <DataTable
        data={data?.data ? data.data : []}
        columns={columns}
        onRowClick={(row) => selectInvoice(row.id)}
      />
    </div>
  );
};
