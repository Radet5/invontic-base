import React from "react";

/* eslint-disable */
const jsonData: {[key: number]: any} = {
  19: JSON.parse('{"data":{"id":19,"supplier_id":13,"supplier_name":"Amazon","supplier_invoice_id":"112-6972545-9965002","invoice_date":"2019-05-26","invoice_type_id":3,"invoice_type":"Credit","invoice_total":69.87,"accounting_date":"2019-05-26","invoice_records":[{"id":118,"invoice_id":19,"good_id":82,"quantity":1,"unit_price":69.87,"created_at":null,"updated_at":null}]}}'),
  20: JSON.parse('{"data":{"id":20,"supplier_id":14,"supplier_name":"Half-Peach Bakery","supplier_invoice_id":"396451","invoice_date":"2019-05-19","invoice_type_id":2,"invoice_type":"Check","invoice_total":221.25,"accounting_date":"2019-05-20","invoice_records":[{"id":119,"invoice_id":20,"good_id":83,"quantity":20,"unit_price":2},{"id":120,"invoice_id":20,"good_id":84,"quantity":15,"unit_price":3.75},{"id":121,"invoice_id":20,"good_id":85,"quantity":25,"unit_price":2},{"id":122,"invoice_id":20,"good_id":86,"quantity":25,"unit_price":1.5},{"id":123,"invoice_id":20,"good_id":87,"quantity":15,"unit_price":2.5}]}}'),
  22: JSON.parse('{"data":{"id":22,"supplier_id":3,"supplier_name":"Instant Whip","supplier_invoice_id":"1601695379","invoice_date":"2019-05-20","invoice_type_id":2,"invoice_type":"Check","invoice_total":338.87,"accounting_date":"2019-05-20","invoice_records":[{"id":124,"invoice_id":22,"good_id":89,"quantity":1,"unit_price":45.39},{"id":125,"invoice_id":22,"good_id":8,"quantity":4,"unit_price":8.25},{"id":126,"invoice_id":22,"good_id":9,"quantity":1,"unit_price":8.25},{"id":127,"invoice_id":22,"good_id":90,"quantity":1,"unit_price":9.25},{"id":128,"invoice_id":22,"good_id":91,"quantity":1,"unit_price":8.3},{"id":129,"invoice_id":22,"good_id":92,"quantity":5,"unit_price":21.2},{"id":130,"invoice_id":22,"good_id":93,"quantity":1,"unit_price":14.29},{"id":131,"invoice_id":22,"good_id":114,"quantity":2,"unit_price":14.81},{"id":132,"invoice_id":22,"good_id":10,"quantity":2,"unit_price":14.96},{"id":133,"invoice_id":22,"good_id":111,"quantity":1,"unit_price":24.6},{"id":134,"invoice_id":22,"good_id":112,"quantity":1,"unit_price":25.1},{"id":135,"invoice_id":22,"good_id":113,"quantity":1,"unit_price":5.15}]}}'),
};
/* eslint-enable */

interface InvoiceManagerProps {
  invoiceId: number | null;
}

export const InvoiceManager = ({
  invoiceId,
}: InvoiceManagerProps): JSX.Element => {
  if (!invoiceId) {
    return <div>No invoice selected</div>;
  } else {
    return <div>{jsonData[invoiceId].data.supplier_name}</div>;
  }
};

//        return
//        {selectedInvoice ? (
//          <Invoice vendors={vendors} invoiceId={selectedInvoice} />
//        ) : null}
//        <button onClick={() => setSelectedInvoice(generateInvoiceId())}>
//          New Invoice
//        </button>
