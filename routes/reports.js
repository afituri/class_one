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
          format: 'A4',
        },
        recipe: "phantom-pdf",
      },
      // data:{allResults : results , national:nationality}
    }).then(function (response) {
      response.result.pipe(res);
    });
  });

  // this deathCertificate // widght A4
  router.get('/birthCertificate', function(req, res, next) {
    jsr.render({
      template: {
        content:  fs.readFileSync(path.join(__dirname, "../views/reports/birthCertificate.html"), "utf8"),
        phantom:{
          format: 'A4',
        },
        recipe: "phantom-pdf",
      },
      // data:{allResults : results , national:nationality}
    }).then(function (response) {
      response.result.pipe(res);
    });
  });

  // this certificateOfFamilyStatus // widght A4
  router.get('/certificateOfFamilyStatus', function(req, res, next) {
    jsr.render({
      template: {
        content:  fs.readFileSync(path.join(__dirname, "../views/reports/certificateOfFamilyStatus.html"), "utf8"),
        phantom:{
          format: 'A4',
        },
        recipe: "phantom-pdf",
      },
      // data:{allResults : results , national:nationality}
    }).then(function (response) {
      response.result.pipe(res);
    });
  });

  // this certificateSociaSituation // widght A4
  router.get('/certificateSociaSituation', function(req, res, next) {
    jsr.render({
      template: {
        content:  fs.readFileSync(path.join(__dirname, "../views/reports/certificateSociaSituation.html"), "utf8"),
        phantom:{
          format: 'A4',
        },
        recipe: "phantom-pdf",
      },
      // data:{allResults : results , national:nationality}
    }).then(function (response) {
      response.result.pipe(res);
    });
  });

  // this is test for aladdin, please don't remove it
  router.get('/deathCertificateTest', function(req, res, next) {
    jsr.render({
      template: {
        content:  fs.readFileSync(path.join(__dirname, "../views/reports/deathCertificateTest.html"), "utf8"),
        phantom:{
          format: 'A4',
        },
        recipe: "phantom-pdf",
        engine: "jsrender"
      },
      // data:{allResults : results , national:nationality}
    }).then(function (response) {
      response.result.pipe(res);
    });
  })

}