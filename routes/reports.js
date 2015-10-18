var models = require("../models");
module.exports = function (router) {
  var jsr = require("jsreport");
  var fs = require("fs");
  var path = require("path");

  // this deathCertificate // widght A4
  router.get('/deathCertificate', function(req, res, next) {
    jsr.render({
      template: {
        content:  fs.readFileSync(path.join(__dirname, "../views/reports/deathCertificate.html"), "utf8"),
        phantom:{
          orientation: "landscape",
        },
        recipe: "phantom-pdf",
      },
      // data:{allResults : results , national:nationality}
    }).then(function (response) {
      response.result.pipe(res);
    });
  });

  //   // this noOfLocaleObs // widght A4
  // router.get('/noOfLocaleObs', function(req, res, next) {
  //   console.log(office[1].office_name_ar);
  //   reportMgr.getAllNoOfLocaleObs(function(arr1,arr2,arr3,arr4,arr5,arr6){
  //     jsr.render({
  //       template: { 
  //         content:  fs.readFileSync(path.join(__dirname, "../views/reports/noOfLocaleObs.html"), "utf8"),
  //         phantom:{
  //           orientation: "landscape"
  //         },
  //         recipe: "phantom-pdf",
  //         helpers:resultsNoOfLocaleObs.toString()
  //       },
  //       data:{office:office,arr1:arr1,arr2:arr2,arr3:arr3,arr4:arr4,arr5:arr5,arr6:arr6,officePar:office}
  //     }).then(function (response) {
  //       response.result.pipe(res);
  //     });
  //   });
  // });

}