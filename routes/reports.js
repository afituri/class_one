var models = require("../models");
module.exports = function (router) {
  var jsr = require("jsreport");
  var fs = require("fs");
  var path = require("path");
  var member = require('../app/member').member_mgr;
  var helpers = require('../app/helpers').helpers_mgr;
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
  router.get('/certificateSociaSituation/:id', function(req, res, next) {
    member.get_member(req.params.id,function(result){
      member.get_member_children(req.params.id,result[0].Personal.Gender,function(children){
        var date=result[0].Personal.Birth_Date.getDate()+' / '+parseFloat(result[0].Personal.Birth_Date.getMonth()+1)+' / '+result[0].Personal.Birth_Date.getFullYear();
        var now = new Date();
        var nowdate =now.getDate()+' / '+parseFloat(now.getMonth()+1)+' / '+now.getFullYear();
        helpers.date_later(now,function(ardate){
          jsr.render({
            template: {
              content:  fs.readFileSync(path.join(__dirname, "../views/reports/certificateSociaSituation.html"), "utf8"),
              phantom:{
                format: 'A4',
              },
              recipe: "phantom-pdf",
              helpers: certificateSociaSituation.toString()
            },
            data:{Results : result[0],child:children,date:date,nowdate:nowdate,ardate:ardate}
          }).then(function (response) {
            response.result.pipe(res);
          });
        });
      });
    });
  });

  function certificateSociaSituation(data,child){
    var html='';
    if(data.Personal.Gender==1){
      if(data.Personal.Socialstatus_Id==1){
        html+='<div class="row">\
        <div class="col-xs-6">\
          <div> لم يسبق له الزواج <span>:</span><b style="background-color:#DDDDE0 !important;"> اعزب </b></div>\
        </div>\
        <div class="col-xs-6">\
          <div> سبق له الزواج <span>:</span><b style="background-color:#DDDDE0 !important;"> ////////// </b></div>\
        </div>\
      </div>\
      <div style="height: 9px;"></div>\
      <div class="row">\
        <div class="col-xs-12">\
          <div> عدد الاولاد <span>:</span><b style="background-color:#DDDDE0 !important;"> 0 </b></div>\
        </div>\
      </div>';
      }else{
        html+='<div class="row">\
        <div class="col-xs-6">\
          <div> لم يسبق له الزواج <span>:</span><b style="background-color:#DDDDE0 !important;"> ///////// </b></div>\
        </div>\
        <div class="col-xs-6">\
          <div> سبق له الزواج <span>:</span><b style="background-color:#DDDDE0 !important;"> متزوج </b></div>\
        </div>\
      </div>\
      <div style="height: 9px;"></div>\
      <div class="row">\
        <div class="col-xs-12">\
          <div> عدد الاولاد <span>:</span><b style="background-color:#DDDDE0 !important;"> '+child+' </b></div>\
        </div>\
      </div>';
      }
      html+='<div style="height: 9px;"></div>\
      <div class="row">\
        <div class="col-xs-4">\
          <div> لم يسبق لها الزواج <span>(</span> بكر <span>)</span><span>:</span>\
            <b style="background-color:#DDDDE0 !important;"> //////// </b>\
          </div>\
        </div>\
        <div class="col-xs-3">\
          <div> ثيب <span>/</span> أرملة <span>:</span>\
            <b style="background-color:#DDDDE0 !important;"> ///////// </b>\
          </div>\
        </div>\
        <div class="col-xs-3">\
          <div> أرملة <span>:</span>\
            <b style="background-color:#DDDDE0 !important;"> //////// </b>\
          </div>\
        </div>\
        <div class="col-xs-2">\
          <div> مطلقة <span>:</span>\
            <b style="background-color:#DDDDE0 !important;"> ///////// </b>\
          </div>\
        </div>\
      </div>\
      <div style="height: 9px;"></div>\
      <div class="row">\
        <div class="col-xs-12">\
          <div> عدد أولادها <span>:</span>\
            <b style="background-color:#DDDDE0 !important;"> ////////////// </b>\
          </div>\
        </div>\
      </div>\
      <hr>\
      <div class="row">\
        <div class="col-xs-12">\
          <div> وحررت هذه الشهادة بناء على طلب الطالب وقيدت بسجل الصور رقم <span>:</span>\
            <b style="background-color:#DDDDE0 !important;">  </b>\
          </div>\
        </div>\
      </div>\
      <div style="height: 9px;"></div>';
    }else{
      html+='<div class="row">\
        <div class="col-xs-6">\
          <div> لم يسبق له الزواج <span>:</span><b style="background-color:#DDDDE0 !important;"> ///////// </b></div>\
        </div>\
        <div class="col-xs-6">\
          <div> سبق له الزواج <span>:</span><b style="background-color:#DDDDE0 !important;"> //////// </b></div>\
        </div>\
      </div>\
      <div style="height: 9px;"></div>\
      <div class="row">\
        <div class="col-xs-12">\
          <div> عدد الاولاد <span>:</span><b style="background-color:#DDDDE0 !important;"> 0 </b></div>\
        </div>\
      </div>';
      if(data.Personal.Socialstatus_Id==1){
        html+='<div style="height: 9px;"></div>\
          <div class="row">\
            <div class="col-xs-4">\
              <div> لم يسبق لها الزواج <span>(</span> بكر <span>)</span><span>:</span>\
                <b style="background-color:#DDDDE0 !important;"> بكر </b>\
              </div>\
            </div>\
            <div class="col-xs-3">\
              <div> ثيب <span>/</span> أرملة <span>:</span>\
                <b style="background-color:#DDDDE0 !important;"> ///////// </b>\
              </div>\
            </div>\
            <div class="col-xs-3">\
              <div> أرملة <span>:</span>\
                <b style="background-color:#DDDDE0 !important;"> //////// </b>\
              </div>\
            </div>\
            <div class="col-xs-2">\
              <div> مطلقة <span>:</span>\
                <b style="background-color:#DDDDE0 !important;"> ///////// </b>\
              </div>\
            </div>\
          </div>\
          <div style="height: 9px;"></div>\
          <div class="row">\
            <div class="col-xs-12">\
              <div> عدد أولادها <span>:</span>\
                <b style="background-color:#DDDDE0 !important;"> ////////////// </b>\
              </div>\
            </div>\
          </div>\
          <hr>\
          <div class="row">\
            <div class="col-xs-12">\
              <div> وحررت هذه الشهادة بناء على طلب الطالب وقيدت بسجل الصور رقم <span>:</span>\
                <b style="background-color:#DDDDE0 !important;">  </b>\
              </div>\
            </div>\
          </div>\
          <div style="height: 9px;"></div>';
      }else if(data.Personal.Socialstatus_Id==2){
        html+='<div style="height: 9px;"></div>\
          <div class="row">\
            <div class="col-xs-4">\
              <div> لم يسبق لها الزواج <span>(</span> بكر <span>)</span><span>:</span>\
                <b style="background-color:#DDDDE0 !important;"> /////// </b>\
              </div>\
            </div>\
            <div class="col-xs-3">\
              <div> ثيب <span>/</span> أرملة <span>:</span>\
                <b style="background-color:#DDDDE0 !important;"> ///////// </b>\
              </div>\
            </div>\
            <div class="col-xs-3">\
              <div> أرملة <span>:</span>\
                <b style="background-color:#DDDDE0 !important;"> //////// </b>\
              </div>\
            </div>\
            <div class="col-xs-2">\
              <div> مطلقة <span>:</span>\
                <b style="background-color:#DDDDE0 !important;"> ///////// </b>\
              </div>\
            </div>\
          </div>\
          <div style="height: 9px;"></div>\
          <div class="row">\
            <div class="col-xs-12">\
              <div> عدد أولادها <span>:</span>\
                <b style="background-color:#DDDDE0 !important;">'+child+' </b>\
              </div>\
            </div>\
          </div>\
          <hr>\
          <div class="row">\
            <div class="col-xs-12">\
              <div> وحررت هذه الشهادة بناء على طلب الطالب وقيدت بسجل الصور رقم <span>:</span>\
                <b style="background-color:#DDDDE0 !important;">  </b>\
              </div>\
            </div>\
          </div>\
          <div style="height: 9px;"></div>';
      }else if(data.Personal.Socialstatus_Id==3){
        html+='<div style="height: 9px;"></div>\
          <div class="row">\
            <div class="col-xs-4">\
              <div> لم يسبق لها الزواج <span>(</span> بكر <span>)</span><span>:</span>\
                <b style="background-color:#DDDDE0 !important;"> بكر </b>\
              </div>\
            </div>\
            <div class="col-xs-3">\
              <div> ثيب <span>/</span> أرملة <span>:</span>\
                <b style="background-color:#DDDDE0 !important;"> ///////// </b>\
              </div>\
            </div>\
            <div class="col-xs-3">\
              <div> أرملة <span>:</span>\
                <b style="background-color:#DDDDE0 !important;"> //////// </b>\
              </div>\
            </div>\
            <div class="col-xs-2">\
              <div> مطلقة <span>:</span>\
                <b style="background-color:#DDDDE0 !important;"> مطلقة </b>\
              </div>\
            </div>\
          </div>\
          <div style="height: 9px;"></div>\
          <div class="row">\
            <div class="col-xs-12">\
              <div> عدد أولادها <span>:</span>\
                <b style="background-color:#DDDDE0 !important;"> '+child+' </b>\
              </div>\
            </div>\
          </div>\
          <hr>\
          <div class="row">\
            <div class="col-xs-12">\
              <div> وحررت هذه الشهادة بناء على طلب الطالب وقيدت بسجل الصور رقم <span>:</span>\
                <b style="background-color:#DDDDE0 !important;">  </b>\
              </div>\
            </div>\
          </div>\
          <div style="height: 9px;"></div>';
      }else{
        html+='<div style="height: 9px;"></div>\
          <div class="row">\
            <div class="col-xs-4">\
              <div> لم يسبق لها الزواج <span>(</span> بكر <span>)</span><span>:</span>\
                <b style="background-color:#DDDDE0 !important;"> بكر </b>\
              </div>\
            </div>\
            <div class="col-xs-3">\
              <div> ثيب <span>/</span> أرملة <span>:</span>\
                <b style="background-color:#DDDDE0 !important;"> ///////// </b>\
              </div>\
            </div>\
            <div class="col-xs-3">\
              <div> أرملة <span>:</span>\
                <b style="background-color:#DDDDE0 !important;"> أرملة </b>\
              </div>\
            </div>\
            <div class="col-xs-2">\
              <div> مطلقة <span>:</span>\
                <b style="background-color:#DDDDE0 !important;"> ///////// </b>\
              </div>\
            </div>\
          </div>\
          <div style="height: 9px;"></div>\
          <div class="row">\
            <div class="col-xs-12">\
              <div> عدد أولادها <span>:</span>\
                <b style="background-color:#DDDDE0 !important;"> '+child+' </b>\
              </div>\
            </div>\
          </div>\
          <hr>\
          <div class="row">\
            <div class="col-xs-12">\
              <div> وحررت هذه الشهادة بناء على طلب الطالب وقيدت بسجل الصور رقم <span>:</span>\
                <b style="background-color:#DDDDE0 !important;">  </b>\
              </div>\
            </div>\
          </div>\
          <div style="height: 9px;"></div>';
      }

    }
  return html;
  }
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