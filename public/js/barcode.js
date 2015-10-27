// The default options
// {
//   width:  2,
//   height: 100,
//   quite: 10,
//   format: "CODE128",
//   displayValue: false,
//   font:"monospace",
//   textAlign:"center",
//   fontSize: 12,
//   backgroundColor:"",
//   lineColor:"#000"
// }
// format : "CODE128","EAN","UPC","CODE39","ITF14","ITF"

$(document).ready(function(){
  $("#barcode").JsBarcode("119890002059",{displayValue:true,fontSize:30,height:130});
});