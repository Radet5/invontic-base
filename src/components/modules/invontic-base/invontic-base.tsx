import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Invoice from "../invoice/invoice";
//import FileList from "../file-list/file-list";
import { Drawer } from "../drawer/drawer";
import { InvoiceNavigator } from "../invoice-navigator/invoice-navigator";
import { InvoiceManager } from "../invoice-manager/invoice-manager";
import { TitleBar } from "../title-bar/title-bar";

/* eslint-disable */
const suppliers = [{"id":1,"name":"GFS","site_id":1},{"id":2,"name":"Creation Gardens","site_id":1},{"id":3,"name":"Instant Whip","site_id":1},{"id":5,"name":"Hertiage Wine & Sprits","site_id":1},{"id":6,"name":"Liquor World","site_id":1},{"id":7,"name":"Restaurant Depot","site_id":1},{"id":8,"name":"Kroger","site_id":1},{"id":9,"name":"Heidelberg Distributing","site_id":1},{"id":10,"name":"Grape Gender Crush","site_id":1},{"id":11,"name":"Taos Mountain Energy Foods","site_id":1},{"id":12,"name":"Aflac","site_id":1},{"id":13,"name":"Amazon","site_id":1},{"id":14,"name":"Half-Peach Bakery","site_id":1},{"id":15,"name":"Waste Management","site_id":1},{"id":16,"name":"Quill.com","site_id":1},{"id":17,"name":"Wiltshire Pantry","site_id":1},{"id":18,"name":"Trompeter","site_id":1},{"id":19,"name":"Sitex","site_id":1},{"id":20,"name":"Safai Roastery","site_id":1},{"id":21,"name":"Republic National","site_id":1},{"id":22,"name":"Cellar Door","site_id":1},{"id":23,"name":"Wayfair","site_id":1},{"id":24,"name":"Bathroom Laws","site_id":1},{"id":25,"name":"Spectrum","site_id":1},{"id":26,"name":"Cruzin Cap","site_id":1},{"id":27,"name":"Mountain Crest Gardens","site_id":1},{"id":28,"name":"Lacer","site_id":1},{"id":29,"name":"VNN","site_id":1},{"id":30,"name":"Prima","site_id":1},{"id":31,"name":"AT&T","site_id":1},{"id":32,"name":"Orkin","site_id":1},{"id":33,"name":"Courier Journal","site_id":1},{"id":34,"name":"Dine Company","site_id":1},{"id":35,"name":"BaristaProShop.com","site_id":1},{"id":36,"name":"Saveoncrafts","site_id":1},{"id":37,"name":"Hosey Honey","site_id":1},{"id":38,"name":"LG&E","site_id":1},{"id":39,"name":"Lowes","site_id":1},{"id":40,"name":"Aiya Matcha","site_id":1},{"id":41,"name":"Tom Drexler","site_id":1},{"id":42,"name":"Little Things by Linz","site_id":1},{"id":43,"name":"Scott of all Trades","site_id":1},{"id":44,"name":"Webstaurant Store","site_id":1},{"id":45,"name":"The Botanic Witch","site_id":1},{"id":46,"name":"Keith's Hardware","site_id":1},{"id":47,"name":"Frank Otte's","site_id":1},{"id":48,"name":"Vanguard Wines","site_id":1},{"id":49,"name":"Harney & Sons","site_id":1},{"id":50,"name":"Lyft","site_id":1},{"id":51,"name":"Heros","site_id":1},{"id":52,"name":"Voluforms","site_id":1},{"id":53,"name":"Pet's Place","site_id":1},{"id":54,"name":"Hobby Lobby","site_id":1},{"id":55,"name":"Facebook","site_id":1},{"id":56,"name":"River City Distributing","site_id":1},{"id":57,"name":"ACF Services","site_id":1},{"id":58,"name":"CRS OneSource","site_id":1},{"id":59,"name":"Espresso Parts","site_id":1},{"id":60,"name":"Highland Commerce Guild","site_id":1},{"id":61,"name":"Sugar High","site_id":1},{"id":62,"name":"Door Dash","site_id":1},{"id":63,"name":"Valu Market","site_id":1},{"id":64,"name":"Thomas Hayes","site_id":1},{"id":65,"name":"Dauntless Distributing","site_id":1},{"id":66,"name":"Simply Baklawa","site_id":1},{"id":67,"name":"Toom Sauce","site_id":1},{"id":68,"name":"Factory Direct Craft","site_id":1},{"id":69,"name":"VaseMarket","site_id":1},{"id":70,"name":"Staples","site_id":1},{"id":71,"name":"Panera","site_id":1},{"id":72,"name":"Old Town","site_id":1},{"id":73,"name":"Clearwater Gear","site_id":1},{"id":74,"name":"Glitchbat","site_id":1},{"id":75,"name":"Guided Hand Tarot","site_id":1},{"id":76,"name":"Walmart","site_id":1},{"id":77,"name":"KY Health Justice Network","site_id":1},{"id":78,"name":"Health Permit ","site_id":1},{"id":79,"name":"Beerhouse","site_id":1},{"id":80,"name":"Louisvile Water Co.","site_id":1},{"id":81,"name":"Best Buy","site_id":1},{"id":82,"name":"Lou. Jeff. County Government","site_id":1},{"id":83,"name":"Toddy","site_id":1},{"id":84,"name":"Coffee Wrench","site_id":1},{"id":85,"name":"Target","site_id":1},{"id":87,"name":"KY Dept of Revenue","site_id":1},{"id":88,"name":"Aliexpress","site_id":1},{"id":89,"name":"US Postal Service","site_id":1},{"id":90,"name":"Square","site_id":1},{"id":91,"name":"Joe Dupre","site_id":1},{"id":92,"name":"Fifth Third Bank","site_id":1},{"id":93,"name":"FedEx","site_id":1},{"id":94,"name":"Payne Street Bakehouse \/ Nancy's Bagel Grounds","site_id":1},{"id":95,"name":"Black Lives Matter Housing Project","site_id":1},{"id":96,"name":"Rachel Radwanski","site_id":1},{"id":97,"name":"KY Secretary of State","site_id":1},{"id":98,"name":"RanisWorldFoods","site_id":1},{"id":99,"name":"Jefferson County Revenue Commission","site_id":1},{"id":100,"name":"eCard","site_id":1},{"id":102,"name":"Cintas","site_id":1},{"id":103,"name":"Breadworks","site_id":1},{"id":104,"name":"Grover Greweling & Co.","site_id":1},{"id":105,"name":"Canva","site_id":1},{"id":106,"name":"Best of Signs","site_id":1},{"id":107,"name":"Highlands Card","site_id":1},{"id":108,"name":"Ikea","site_id":1},{"id":109,"name":"StateFoodSafety","site_id":1},{"id":110,"name":"Bed Bath & Beyond","site_id":1},{"id":111,"name":"Refrigeration Hero","site_id":1},{"id":112,"name":"Shopkeep","site_id":1},{"id":113,"name":"Microsoft Corporation","site_id":1},{"id":114,"name":"Dick's Sporting Goods","site_id":1},{"id":115,"name":"Za's Pizza Pub","site_id":1},{"id":116,"name":"eReplacementParts.com","site_id":1},{"id":117,"name":"Home Depot","site_id":1},{"id":118,"name":"StickerYou Inc.","site_id":1},{"id":119,"name":"Matea Verzi","site_id":1},{"id":120,"name":"La Pana","site_id":1},{"id":121,"name":"Southern Pipe & Supply","site_id":1},{"id":122,"name":"UPrinting","site_id":1},{"id":123,"name":"World Market","site_id":1},{"id":124,"name":"Society6","site_id":1},{"id":125,"name":"ShopCouchCovers","site_id":1},{"id":126,"name":"KaTom","site_id":1},{"id":127,"name":"Office Supply","site_id":1},{"id":128,"name":"DGS Retail","site_id":1},{"id":129,"name":"TuscanIron","site_id":1},{"id":130,"name":"FireClayArt","site_id":1}];
const invoiceTypes = [{"id":1,"name":"Cash","site_id":1},{"id":2,"name":"Check","site_id":1},{"id":3,"name":"Credit","site_id":1},{"id":4,"name":"Open","site_id":1},{"id":5,"name":"Credited","site_id":1}];
/* eslint-enable */

const InvonticBase = (): JSX.Element => {
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(
    null
  );

  // generates a UUID for the invoice
  const generateInvoiceId = (): string => {
    return uuidv4();
  };

  return (
    <div className="o-invonticBase">
      <TitleBar />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90vw",
          marginTop: "calc(5vh + 32px)",
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        <Drawer defaultOpen={false}>
          <InvoiceNavigator onInvoiceSelect={setSelectedInvoiceId} />
        </Drawer>
        <div
          style={{
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Invoice
            suppliers={suppliers}
            invoiceTypes={invoiceTypes}
            invoiceId={selectedInvoiceId}
          />
        </div>
        <Drawer side="right">Hi</Drawer>
      </div>
    </div>
  );
};

export default InvonticBase;
