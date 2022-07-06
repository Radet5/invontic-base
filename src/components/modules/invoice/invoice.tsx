import React, { useState, useEffect, Fragment } from "react";
import { roundTwoDecimals } from "../math";

import Grid from "../grid/grid";
import { Select } from "../atoms/select/select";
//import SaveButton from "../save-button/save-button";
//import FileLoader from "../file-loader/file-loader";
import { Field } from "../atoms/field/field";
import { InvoiceRecordSums } from "./record-sums/record-sums";
import { InvoiceTotals } from "./totals/totals";

/* eslint-disable */
const jsonData: {[key: number]: any} = {
  19: JSON.parse('{"data":{"id":19,"supplier_id":13,"supplier_name":"Amazon","supplier_invoice_id":"112-6972545-9965002","invoice_date":"2019-05-26","invoice_type_id":3,"invoice_type":"Credit","invoice_total":69.87,"accounting_date":"2019-05-26","invoice_records":[{"id":118,"invoice_id":19,"good_id":82,"quantity":1,"unit_price":69.87,"created_at":null,"updated_at":null}]}}'),
  20: JSON.parse('{"data":{"id":20,"supplier_id":14,"supplier_name":"Half-Peach Bakery","supplier_invoice_id":"396451","invoice_date":"2019-05-19","invoice_type_id":2,"invoice_type":"Check","invoice_total":221.25,"accounting_date":"2019-05-20","invoice_records":[{"id":119,"invoice_id":20,"good_id":83,"quantity":20,"unit_price":2},{"id":120,"invoice_id":20,"good_id":84,"quantity":15,"unit_price":3.75},{"id":121,"invoice_id":20,"good_id":85,"quantity":25,"unit_price":2},{"id":122,"invoice_id":20,"good_id":86,"quantity":25,"unit_price":1.5},{"id":123,"invoice_id":20,"good_id":87,"quantity":15,"unit_price":2.5}]}}'),
  22: JSON.parse('{"data":{"id":22,"supplier_id":3,"supplier_name":"Instant Whip","supplier_invoice_id":"1601695379","invoice_date":"2019-05-20","invoice_type_id":2,"invoice_type":"Check","invoice_total":338.87,"accounting_date":"2019-05-20","invoice_records":[{"id":124,"invoice_id":22,"good_id":89,"quantity":1,"unit_price":45.39},{"id":125,"invoice_id":22,"good_id":8,"quantity":4,"unit_price":8.25},{"id":126,"invoice_id":22,"good_id":9,"quantity":1,"unit_price":8.25},{"id":127,"invoice_id":22,"good_id":90,"quantity":1,"unit_price":9.25},{"id":128,"invoice_id":22,"good_id":91,"quantity":1,"unit_price":8.3},{"id":129,"invoice_id":22,"good_id":92,"quantity":5,"unit_price":21.2},{"id":130,"invoice_id":22,"good_id":93,"quantity":1,"unit_price":14.29},{"id":131,"invoice_id":22,"good_id":114,"quantity":2,"unit_price":14.81},{"id":132,"invoice_id":22,"good_id":10,"quantity":2,"unit_price":14.96},{"id":133,"invoice_id":22,"good_id":111,"quantity":1,"unit_price":24.6},{"id":134,"invoice_id":22,"good_id":112,"quantity":1,"unit_price":25.1},{"id":135,"invoice_id":22,"good_id":113,"quantity":1,"unit_price":5.15}]}}'),
};
const jsonGoods: {[key: number]: any} = {
  13: [{"id":82,"name":"KitchenAid","supplier_id":13,"item_code":"KHM7210API","tax_rate":0},{"id":406,"name":"juice pouring spout bottle containers","supplier_id":13,"item_code":"spout","tax_rate":0.06},{"id":407,"name":"AwePackage 1 Lbs Kraft Paper Tin Tie Bag","supplier_id":13,"item_code":"TIN TIE","tax_rate":0.06},{"id":408,"name":"good grips cutting carving board","supplier_id":13,"item_code":"board","tax_rate":0.06},{"id":413,"name":"monin jalepeno conccentrate","supplier_id":13,"item_code":"monin","tax_rate":0},{"id":414,"name":"zziploc twis n loc container","supplier_id":13,"item_code":"zip","tax_rate":0.06},{"id":415,"name":"baby changing pad","supplier_id":13,"item_code":"baby","tax_rate":0.06},{"id":463,"name":"Avery 3 inch binder black","supplier_id":13,"item_code":"avery binder","tax_rate":0.06},{"id":464,"name":"air fresheners","supplier_id":13,"item_code":"vois","tax_rate":0.06},{"id":465,"name":"best choice products sconces","supplier_id":13,"item_code":"sconces","tax_rate":0.06},{"id":486,"name":"Acrimet Premium Tape dispenser","supplier_id":13,"item_code":"acrim","tax_rate":0.06},{"id":487,"name":"panda planner","supplier_id":13,"item_code":"panda","tax_rate":0.06},{"id":488,"name":"bamboo shelves","supplier_id":13,"item_code":"bamboo","tax_rate":0.06},{"id":489,"name":"edison bulbs","supplier_id":13,"item_code":"edison","tax_rate":0.06},{"id":490,"name":"blue painters tape","supplier_id":13,"item_code":"blue tape","tax_rate":0.06},{"id":550,"name":"giftcard","supplier_id":13,"item_code":"giftcards","tax_rate":0},{"id":572,"name":"fifo bottles 16 oz","supplier_id":13,"item_code":"fifo16oz","tax_rate":0.06},{"id":573,"name":"suction caddy","supplier_id":13,"item_code":"succadd","tax_rate":0.06},{"id":581,"name":"Liquor Spout Covers","supplier_id":13,"item_code":"lsc","tax_rate":0.06},{"id":582,"name":"2.6 gal trash bags","supplier_id":13,"item_code":"trash2.6","tax_rate":0.06},{"id":583,"name":"batteries Dcell","supplier_id":13,"item_code":"batterD","tax_rate":0.06},{"id":584,"name":"batteries AAA","supplier_id":13,"item_code":"batterAAA","tax_rate":0.06},{"id":585,"name":"plastic water cups 8oz","supplier_id":13,"item_code":"kidscup","tax_rate":0.06},{"id":586,"name":"Kleen pail green 6qrt","supplier_id":13,"item_code":"kleengreen","tax_rate":0.06},{"id":587,"name":"crockpot","supplier_id":13,"item_code":"crock","tax_rate":0.06},{"id":588,"name":"timer","supplier_id":13,"item_code":"TIMER","tax_rate":0.06},{"id":589,"name":"sharpies","supplier_id":13,"item_code":"sharpie","tax_rate":0.06},{"id":590,"name":"food storage","supplier_id":13,"item_code":"storage","tax_rate":0.06},{"id":613,"name":"clumping litter ","supplier_id":13,"item_code":"okocat","tax_rate":0.06},{"id":614,"name":"disposable white poly aprons","supplier_id":13,"item_code":"dwpa","tax_rate":0.06},{"id":615,"name":"dish washing apron","supplier_id":13,"item_code":"s2pabi","tax_rate":0.06},{"id":616,"name":"disposable face masks","supplier_id":13,"item_code":"face","tax_rate":0.06},{"id":617,"name":"candy cane crunch bags 10 oz","supplier_id":13,"item_code":"candy","tax_rate":0.06},{"id":637,"name":"marshmellow","supplier_id":13,"item_code":"marsh","tax_rate":0},{"id":638,"name":"shipping","supplier_id":13,"item_code":"ship","tax_rate":0.06},{"id":675,"name":"Matcha Whisk","supplier_id":13,"item_code":"MATCH WHISK","tax_rate":0.06},{"id":676,"name":"Promotion","supplier_id":13,"item_code":"PROMO","tax_rate":0},{"id":698,"name":"Sunco Lighting LED Bulb 13W","supplier_id":13,"item_code":"suncolight","tax_rate":0.06},{"id":711,"name":"Stayfree Maxi Pads Super","supplier_id":13,"item_code":"SF MAXI","tax_rate":0.06},{"id":712,"name":"First Aid 5 Piece Eye Wash Kit","supplier_id":13,"item_code":"FA EYE ","tax_rate":0.06},{"id":713,"name":"Par30 Lomg Neck Halogen 75w Flood","supplier_id":13,"item_code":"PAR30","tax_rate":0.06},{"id":714,"name":"Medpride 3x3 sterile gauze","supplier_id":13,"item_code":"GAUZE","tax_rate":0.06},{"id":715,"name":"Tampax Pocket Pearl Plastic Tampon Duopack","supplier_id":13,"item_code":"TAMPAX","tax_rate":0.06},{"id":749,"name":"U Brands Contempo Magnetic Dry Erase Board 11x14 W","supplier_id":13,"item_code":"UBCM DEB","tax_rate":0.06},{"id":750,"name":"Cat6 RJ45 Cable Creation Connector Ethernet","supplier_id":13,"item_code":"Cat6 CNCT","tax_rate":0.06},{"id":751,"name":"3 ft Extension Cord NEMA 5-15R to 5-15P","supplier_id":13,"item_code":"EXT CORD","tax_rate":0.06},{"id":752,"name":"WM 6 oz Clear PET Honey Bear Yellow Flip Top","supplier_id":13,"item_code":"HON BEAR","tax_rate":0.06},{"id":753,"name":"Extendable Broom Dustpan Set","supplier_id":13,"item_code":"QJQBMAI","tax_rate":0.06},{"id":754,"name":"Blami Arts Chalk Marker and Label","supplier_id":13,"item_code":"BA CMARKER","tax_rate":0.06},{"id":755,"name":"Sharpie Fine Point Markers","supplier_id":13,"item_code":"30162PP","tax_rate":0.06},{"id":756,"name":"12 oz Ceramic Coffee Mug ","supplier_id":13,"item_code":"LEANDALE","tax_rate":0.06},{"id":757,"name":"10x3mm Nickel Pawn Magnet Pins","supplier_id":13,"item_code":"FINDMAG","tax_rate":0.06},{"id":758,"name":"Enther Meal Prep Containers Bento Box","supplier_id":13,"item_code":"EN MPrep","tax_rate":0.06},{"id":759,"name":"Discount","supplier_id":13,"item_code":"Discount","tax_rate":0},{"id":760,"name":"Math Is Wrong","supplier_id":13,"item_code":"MATH","tax_rate":0},{"id":772,"name":"Legrand Wiremold CDI-5 Corduct Cord Protector","supplier_id":13,"item_code":"LEGRAND","tax_rate":0.06},{"id":920,"name":"Avery R. In. 12 Tab Binder Dividers Multicolor 6 s","supplier_id":13,"item_code":"11196","tax_rate":0.06},{"id":921,"name":"24 Pock Expan File Folder\/Accord. Organizer","supplier_id":13,"item_code":"1","tax_rate":0.06},{"id":922,"name":"ChromaLabel 1\/2 in. Round Perm. Gray Dot Sticker","supplier_id":13,"item_code":"2","tax_rate":0.06},{"id":923,"name":"Dissolvable Food Rotation Label 2\"x3\" Adhesive","supplier_id":13,"item_code":"3","tax_rate":0.06},{"id":924,"name":"Tusko Nitrile Rubber Clean Dish Glove Vinyl Med.","supplier_id":13,"item_code":"4","tax_rate":0.06},{"id":925,"name":"Tusko Nitrile Rubber Clean Dish Glove Vinyl Large","supplier_id":13,"item_code":"5","tax_rate":0.06},{"id":955,"name":"Name Tag\/Badge Blanks Black 1x3 Round Corners","supplier_id":13,"item_code":"6","tax_rate":0.06},{"id":956,"name":"Taylor Precision Prod. Pro Splash Drop Timer Vol S","supplier_id":13,"item_code":"7","tax_rate":0.06},{"id":957,"name":"Scissors 8\" multipurpose iBayam Direct","supplier_id":13,"item_code":"8","tax_rate":0.06},{"id":958,"name":"Removable 1\" Day of the Week Labels 7000 lables","supplier_id":13,"item_code":"9","tax_rate":0.06},{"id":993,"name":"Siliconw Bottle Brus 12.5\" Bottle Cleaner","supplier_id":13,"item_code":"KITCHINY","tax_rate":0.06},{"id":994,"name":"Long Handle Bottle Brush","supplier_id":13,"item_code":"MR.SIGA","tax_rate":0.06},{"id":995,"name":"Whirlpool Water Filter Gray\/White","supplier_id":13,"item_code":"WHA4BF5","tax_rate":0.06},{"id":996,"name":"2020 National Parks Foundation Calendar","supplier_id":13,"item_code":"CALENDAR","tax_rate":0.06},{"id":997,"name":"Filtrete 16x25x1 AC Furnace Air Filter","supplier_id":13,"item_code":"AIRFILTER","tax_rate":0.06},{"id":1050,"name":"Printer Ink - Black","supplier_id":13,"item_code":"HP3JA03AN","tax_rate":0.06},{"id":1051,"name":"Printer Ink - Cyan, Magenta, Yellow","supplier_id":13,"item_code":"HP3HZ96AN","tax_rate":0.06},{"id":1052,"name":"Scotch Brite Packing Tape","supplier_id":13,"item_code":"MMM145","tax_rate":0.06},{"id":1053,"name":"Scrubbing Bubbles","supplier_id":13,"item_code":"SCRBLS","tax_rate":0.06},{"id":1207,"name":"Printer paper - clover - thermal printer tape","supplier_id":13,"item_code":"receipt paper","tax_rate":0.06},{"id":1210,"name":"Tape - Scotch #35 Vinyl Electrical","supplier_id":13,"item_code":"electape","tax_rate":0.06},{"id":1211,"name":"Kwikset 97300-818 Tustin Privacy Lever","supplier_id":13,"item_code":"kwiksetLever","tax_rate":0.06},{"id":1223,"name":"Goo Gone Adhesive Remover","supplier_id":13,"item_code":"goo gone","tax_rate":0.06},{"id":1246,"name":"Cold brew filters Brewista cold pro","supplier_id":13,"item_code":"coldbrwfilt","tax_rate":0.06},{"id":1253,"name":"Envelopes","supplier_id":13,"item_code":"env","tax_rate":0.06},{"id":1271,"name":"Post-Its","supplier_id":13,"item_code":"postit","tax_rate":0.06},{"id":1272,"name":"Cold Brew Nylon bag","supplier_id":13,"item_code":"coldbrewnylon","tax_rate":0.06},{"id":1281,"name":"Measuring Cup 1 Cup","supplier_id":13,"item_code":"mesure","tax_rate":0.06},{"id":1282,"name":"Food scale","supplier_id":13,"item_code":"scale","tax_rate":0.06},{"id":1283,"name":"Chai Tea Rani","supplier_id":13,"item_code":"chai","tax_rate":0},{"id":1313,"name":"Glass Cleaner (Sprayway)","supplier_id":13,"item_code":"Glass","tax_rate":0.06},{"id":1314,"name":"Griddle Screen - 200CC Scotch Brite","supplier_id":13,"item_code":"griddlescr","tax_rate":0.06},{"id":1323,"name":"Lock Cash Box","supplier_id":13,"item_code":"lockbox","tax_rate":0.06},{"id":1324,"name":"Knock Box Rattleware","supplier_id":13,"item_code":"Knock-Box","tax_rate":0.06},{"id":1325,"name":"Nylon Bags for Chai food strainer bag","supplier_id":13,"item_code":"nylon-chai","tax_rate":0.06},{"id":1326,"name":"Tamper mat","supplier_id":13,"item_code":"tampermat","tax_rate":0.06},{"id":1331,"name":"Flatware Drawer Organizer","supplier_id":13,"item_code":"flatdraw","tax_rate":0.06},{"id":1332,"name":"Knife Drawer Organizer","supplier_id":13,"item_code":"knifedraw","tax_rate":0.06},{"id":1333,"name":"Silicone Pot Holders","supplier_id":13,"item_code":"pothold","tax_rate":0.06},{"id":1356,"name":"Fishing line","supplier_id":13,"item_code":"fishing","tax_rate":0.06},{"id":1357,"name":"Plastic cups 9oz","supplier_id":13,"item_code":"9oz","tax_rate":0.06},{"id":1358,"name":"Use First labels","supplier_id":13,"item_code":"usefirst","tax_rate":0.06},{"id":1361,"name":"Chalk Markers","supplier_id":13,"item_code":"chalk","tax_rate":0.06},{"id":1368,"name":"Cooking Twine","supplier_id":13,"item_code":"twine","tax_rate":0.06},{"id":1369,"name":"Torani Sauce Pump","supplier_id":13,"item_code":"pump","tax_rate":0.06},{"id":1430,"name":"Fox Run Bagel Cutter\/Holder","supplier_id":13,"item_code":"BAGELCUT","tax_rate":0.06},{"id":1432,"name":"Brown Kraft Butcher Paper Roll","supplier_id":13,"item_code":"BROWN","tax_rate":0.06},{"id":1433,"name":"Zester, Cheese Grater","supplier_id":13,"item_code":"ZESTER","tax_rate":0.06},{"id":1434,"name":"3-tier Cooling Rack","supplier_id":13,"item_code":"3TIER","tax_rate":0.06},{"id":1474,"name":"Wadoy Stainless Steel Pro Whisk Replacement","supplier_id":13,"item_code":"WHISK PRO","tax_rate":0.06},{"id":1475,"name":"YEAKE Gooseneck Bamboo Mirror","supplier_id":13,"item_code":"MIRROR","tax_rate":0.06},{"id":1476,"name":"Social Distancing Floor Decals","supplier_id":13,"item_code":"FLOORDECAL","tax_rate":0.06},{"id":1480,"name":"ExcelMark Rubber Stamp Ink Pad","supplier_id":13,"item_code":"STAMPPAD","tax_rate":0.06},{"id":1485,"name":"Paper Clips","supplier_id":13,"item_code":"PCLIP","tax_rate":0.06},{"id":1486,"name":"OXO Bottle Brush ","supplier_id":13,"item_code":"BOTBR","tax_rate":0.06},{"id":1493,"name":"20 pack Zipper Plastic Envelopes","supplier_id":13,"item_code":"ZIPENV","tax_rate":0.06},{"id":1505,"name":"Utilility Knife Replacement Blades Razor","supplier_id":13,"item_code":"RAZOR","tax_rate":0.06},{"id":1528,"name":"Ramddy 34 qt. Collapsible Crate 3 pack","supplier_id":13,"item_code":"CRATE","tax_rate":0.06},{"id":1529,"name":"Ipad Case Heavy Duty","supplier_id":13,"item_code":"IPADCASE","tax_rate":0.06},{"id":1530,"name":"RSVP Endurance Individual Measuring Spoon 1 tsp\/2","supplier_id":13,"item_code":"SPOON","tax_rate":0.06},{"id":1531,"name":"DXary Coffee Machine Cleaning Brush Set of 4","supplier_id":13,"item_code":"CLEANBRUSH","tax_rate":0.06},{"id":1532,"name":"Strenco 1 in. Self Adhesive Hook and Loop","supplier_id":13,"item_code":"Hook","tax_rate":0.06},{"id":1533,"name":"GE Adapter Wall Tap, 3 Prong 1 Pack","supplier_id":13,"item_code":"WALLTAP","tax_rate":0.06},{"id":1534,"name":"Tablet Stand Holder Tablet Mount","supplier_id":13,"item_code":"IPADMOUNT","tax_rate":0.06},{"id":1539,"name":"Mr. Dry Erase Markers 8 pack","supplier_id":13,"item_code":"MRPEN","tax_rate":0.06},{"id":1540,"name":"Gorilla Tough & Clear Double Sided XL Tape","supplier_id":13,"item_code":"GORTAPE","tax_rate":0.06},{"id":1541,"name":"Hario 6 x 100-Count Paper Filters","supplier_id":13,"item_code":"HARIO","tax_rate":0.06},{"id":1542,"name":"Dissolvable Food Rotation Labels 500-pk","supplier_id":13,"item_code":"FOODLBL","tax_rate":0.06},{"id":1570,"name":"12\" Zip Ties 100 pack","supplier_id":13,"item_code":"ZIPTIE","tax_rate":0.06},{"id":1571,"name":"Suction Cup Hooks 4 Pack","supplier_id":13,"item_code":"SUCHOOKS","tax_rate":0.06},{"id":1572,"name":"Small Whisks 7in. ","supplier_id":13,"item_code":"WHISKSM","tax_rate":0.06},{"id":1573,"name":"Chalkboard Hanging Sign","supplier_id":13,"item_code":"CHALKSIGN","tax_rate":0.06},{"id":1574,"name":"Desktop Hole Punch","supplier_id":13,"item_code":"HOLEPNCH","tax_rate":0.06},{"id":1575,"name":"MatchaDNA Cert. Organic Matcha Powder","supplier_id":13,"item_code":"MATCHA","tax_rate":0},{"id":1587,"name":"Blendtec Vented Latching Lid - Commercial","supplier_id":13,"item_code":"LIDBLEND","tax_rate":0.06},{"id":1588,"name":"Chef Select Stainless-Steel Mixing Bowl 3 QT","supplier_id":13,"item_code":"MIXBOWL","tax_rate":0.06},{"id":1589,"name":"Tovolo Stainless Steel Deep Mixing Bowls 1.5 Qt","supplier_id":13,"item_code":"MIXBOWLSM","tax_rate":0.06},{"id":1593,"name":"Spice Rack Organizer","supplier_id":13,"item_code":"SPICERACK","tax_rate":0.06},{"id":1600,"name":"Zip Lock Sealing Bag with Notch Matte Window","supplier_id":13,"item_code":"ZIPBAG","tax_rate":0.06},{"id":1601,"name":"Panini Grill Brush","supplier_id":13,"item_code":"PANINIBRUSH","tax_rate":0.06},{"id":1602,"name":"Anti-Fatigue Floor Mat 3 x 5 ","supplier_id":13,"item_code":"MAT","tax_rate":0.06},{"id":1629,"name":"Rubbermaid Food Storage Cont. 4 qt.","supplier_id":13,"item_code":"PrepCont","tax_rate":0.06},{"id":1630,"name":"Rubbermaid Food Storage Cont. Lid","supplier_id":13,"item_code":"PrepContLid","tax_rate":0.06},{"id":1631,"name":"HIWARE straw cleaner","supplier_id":13,"item_code":"STRAWCLEAN","tax_rate":0.06},{"id":1647,"name":"Pentel GelPen Pack","supplier_id":13,"item_code":"GELPEN","tax_rate":0.06},{"id":1665,"name":"GoTo Foam Upholstery Cushion","supplier_id":13,"item_code":"CUSHION","tax_rate":0.06},{"id":1666,"name":"Clipboard Letter Size","supplier_id":13,"item_code":"CLIPBOARD","tax_rate":0.06},{"id":1667,"name":"Elastic for Masks","supplier_id":13,"item_code":"ELASTIC","tax_rate":0.06},{"id":1672,"name":"Kohler Silent Fill Valve Kit","supplier_id":13,"item_code":"TOILETVALVE","tax_rate":0.06},{"id":1683,"name":"Craftsman Stud Finder","supplier_id":13,"item_code":"STUDFIND","tax_rate":0.06},{"id":1684,"name":"Black & Decker Random Orbit Sander, 5 in","supplier_id":13,"item_code":"SANDER","tax_rate":0.06},{"id":1685,"name":"Picture Hanging Hardware","supplier_id":13,"item_code":"PICTHANG","tax_rate":0.06},{"id":1692,"name":"ChromaLabel 1 in. dot stickers ","supplier_id":13,"item_code":"DOTSTICK","tax_rate":0.06},{"id":1693,"name":"Diffusion Filter ","supplier_id":13,"item_code":"DIFFUSE","tax_rate":0.06},{"id":1694,"name":"Dust Mask","supplier_id":13,"item_code":"DUSTMASK","tax_rate":0.06},{"id":1695,"name":"Energizer 9v Battery ","supplier_id":13,"item_code":"9VBATT","tax_rate":0.06},{"id":1696,"name":"Counterfeit Bill Detector Pen","supplier_id":13,"item_code":"COUNTERFEITPEN","tax_rate":0.06},{"id":1697,"name":"Mighty Max Battery 6V","supplier_id":13,"item_code":"6VBATTERy","tax_rate":0.06},{"id":1698,"name":"Black & Decker Laser Level","supplier_id":13,"item_code":"LASERLVL","tax_rate":0.06},{"id":1699,"name":"1\/8\" Double Ferrules ","supplier_id":13,"item_code":"FERRULES","tax_rate":0.06},{"id":1707,"name":"Pack Tape HD CLR 800\"","supplier_id":13,"item_code":"PACKTAPE","tax_rate":0.06},{"id":1708,"name":"Fiskars SureCut Paper Trimmer, 12 in Cut","supplier_id":13,"item_code":"PAPTRIM","tax_rate":0.06},{"id":1718,"name":"Clorox Toilet Plunger and Bowl Brush Combo","supplier_id":13,"item_code":"PLUNGCOMBO","tax_rate":0.06},{"id":1719,"name":"Novigo Modern Velvet Accent Chair ","supplier_id":13,"item_code":"ACCENTCHAIR","tax_rate":0.06},{"id":1730,"name":"Teal Coffee Mug Set of 4","supplier_id":13,"item_code":"MUGSET","tax_rate":0.06},{"id":1731,"name":"Zen Pleats Porcelain Coffe Mugs ","supplier_id":13,"item_code":"ZENMUG","tax_rate":0.06},{"id":1739,"name":"Blendtec Replacement Soft Rubber Lid","supplier_id":13,"item_code":"BLENDSOFT","tax_rate":0.06},{"id":1740,"name":"Blendtec Commercial Black Cone Latching Lid","supplier_id":13,"item_code":"BLENDCONE","tax_rate":0.06},{"id":1741,"name":"12 pack LED Bulbs 8 Watt","supplier_id":13,"item_code":"LEDBULB","tax_rate":0.06},{"id":1742,"name":"1883 Maison Routin Syrup Pump","supplier_id":13,"item_code":"1883PUMP","tax_rate":0},{"id":1743,"name":"Pasty Brush for Espresso Bar","supplier_id":13,"item_code":"BRUSH","tax_rate":0.06},{"id":1745,"name":"Torani Caramel Sauce 64 oz.","supplier_id":13,"item_code":"CARA","tax_rate":0},{"id":1746,"name":"Fatigue Mat 3' x 5'","supplier_id":13,"item_code":"FATMAT","tax_rate":0.06},{"id":1749,"name":"Planner","supplier_id":13,"item_code":"PLANNER","tax_rate":0.06}],
  14: [{"id":83,"name":"Energy Bar","supplier_id":14,"item_code":"EBAR","tax_rate":0},{"id":84,"name":"Raw Macaroons","supplier_id":14,"item_code":"RMAC","tax_rate":0},{"id":85,"name":"Chocolate Macaroons","supplier_id":14,"item_code":"CMAC","tax_rate":0},{"id":86,"name":"Salted Chocolate Chip Cookies","supplier_id":14,"item_code":"SCCC","tax_rate":0},{"id":87,"name":"Beast Brownies","supplier_id":14,"item_code":"BBROWN","tax_rate":0}],
  3: [{"id":8,"name":"1883 Vanilla Syrup","supplier_id":3,"item_code":"1200","tax_rate":0},{"id":9,"name":"1883 Blackberry Syrup","supplier_id":3,"item_code":"1315","tax_rate":0},{"id":10,"name":"Torani White Choc","supplier_id":3,"item_code":"6838","tax_rate":0},{"id":89,"name":"Whipped Cream 17 Oz","supplier_id":3,"item_code":"1001","tax_rate":0},{"id":90,"name":"1883 Lavender Syrup","supplier_id":3,"item_code":"1341","tax_rate":0},{"id":91,"name":"1883 Sugar Free Caramel","supplier_id":3,"item_code":"1388","tax_rate":0},{"id":92,"name":"Iced Vanilla Bean Cream Powder","supplier_id":3,"item_code":"6665","tax_rate":0},{"id":93,"name":"Torani Chocolate Sauce","supplier_id":3,"item_code":"6835","tax_rate":0},{"id":111,"name":"Bagels Plain","supplier_id":3,"item_code":"8500","tax_rate":0},{"id":112,"name":"Bagels Everything","supplier_id":3,"item_code":"8504","tax_rate":0},{"id":113,"name":"Fuel","supplier_id":3,"item_code":"9699","tax_rate":0},{"id":114,"name":"Torani Caramel Sauce","supplier_id":3,"item_code":"6836","tax_rate":0},{"id":248,"name":"Bagels Cinn\/Rasin","supplier_id":3,"item_code":"8502","tax_rate":0},{"id":255,"name":"1883 Hazelnut Syrup","supplier_id":3,"item_code":"1201","tax_rate":0},{"id":256,"name":"1883 Raspberry Syrup","supplier_id":3,"item_code":"1203","tax_rate":0},{"id":298,"name":"1883 Strawberry Syrup","supplier_id":3,"item_code":"1366","tax_rate":0},{"id":299,"name":"1883 S\/F Vanilla Syrup","supplier_id":3,"item_code":"1393","tax_rate":0},{"id":354,"name":"1883 S\/F Hazelnut Syrup","supplier_id":3,"item_code":"1391","tax_rate":0},{"id":404,"name":"1883 Cherry Syrup","supplier_id":3,"item_code":"1320","tax_rate":0},{"id":561,"name":"Torani S\/F Pumpkin Pie","supplier_id":3,"item_code":"S1049","tax_rate":0},{"id":562,"name":"Torani Sauce Pumpkin Pie","supplier_id":3,"item_code":"6834","tax_rate":0},{"id":618,"name":"Apple Cider (EW)","supplier_id":3,"item_code":"2664","tax_rate":0},{"id":701,"name":"Sugar Free Chocolate Syrup","supplier_id":3,"item_code":"1064","tax_rate":0},{"id":702,"name":"Sugar Free Peppermint","supplier_id":3,"item_code":"1081","tax_rate":0},{"id":1026,"name":"Hot Cocoa","supplier_id":3,"item_code":"7678","tax_rate":0}],
};
/* eslint-enable */

interface InvoiceProps {
  invoiceId: number | null;
  suppliers: Array<{ id: number; name: string }>;
  invoiceTypes: Array<{ id: number; name: string }>;
}

interface InvoiceRecordInterface {
  id: string | null;
  good_id: number;
  quantity: number;
  unit_price: number;
}

const Invoice = (props: InvoiceProps): JSX.Element => {
  const [editTimestamp, setEditTimestamp] = useState("");
  const [invoice, setInvoice] = useState<any>({ id: "" });
  const [fields, setFields] = useState<any>([]);
  const [goods, setGoods] = useState<any>([]);

  useEffect(() => {
    if (invoice.id !== "") {
      setGoods(jsonGoods[invoice.supplier_id]);
    }
  }, [invoice]);

  useEffect(() => {
    if (props.invoiceId) {
      const invoice = jsonData[props.invoiceId].data;
      setInvoice(invoice);
      if (invoice) {
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
      //setVendorId(invoice.supplier_id.toString());
    }
  }, [props.invoiceId, goods]);

  useEffect(() => {
    setEditTimestamp(new Date().toISOString());
  }, [invoice]);

  const setInvoiceRecords = (invoiceRecords: InvoiceRecordInterface[]) => {
    setInvoice({ ...invoice, invoice_records: invoiceRecords });
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
    //console.log(key, value);
    setInvoice({ ...invoice, [key]: value });
  };

  if (invoice.id === "") {
    return <React.Fragment />;
  } else {
    return (
      <React.Fragment>
        <div style={{ marginBottom: "2.5vh", fontSize: "32px" }}>
          {invoice.supplier_name} {invoice.supplier_invoice_id}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
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
            <div style={{ marginBottom: "10px", textAlign: "left" }}>
              <Select
                items={props.suppliers}
                selectedId={invoice.supplier_id}
                onChange={(value) => headerChange("supplier_id", value)}
              />
              <Select
                items={props.invoiceTypes}
                selectedId={invoice.invoice_type_id}
                onChange={(value) => headerChange("invoice_type_id", value)}
              />
            </div>
          </div>
          <div style={{ width: "fit-content", marginLeft: "auto" }}>
            <InvoiceTotals
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
