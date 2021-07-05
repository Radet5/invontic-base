interface InvoiceRecordInterface {
  recordId: string | null;
  itemId: string;
  quantity: number;
  cost: number;
}

export default InvoiceRecordInterface;
