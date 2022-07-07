import React from "react";

interface InvoiceGoodsEditorProps {
  goods: Array<any>;
  setGoods: (goods: Array<any>) => void;
}

export const InvoiceGoodsEditor = ({
  goods,
  setGoods,
}: InvoiceGoodsEditorProps): JSX.Element => {
  return <div>InvoiceGoodsEditor</div>;
};
