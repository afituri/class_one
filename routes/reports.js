var models = require("../models");
var user_helpers = require('../app/user_helpers');
module.exports = function (router) {
  var jsr = require("jsreport");
  var fs = require("fs");
  var path = require("path");
  var member = require('../app/member').member_mgr;
  var helpers = require('../app/helpers').helpers_mgr;
  // this deathCertificate // widght A4
  router.get('/deathCertificate',user_helpers.isLogin, function(req, res, next) {
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
  router.get('/birthCertificate',user_helpers.isLogin, function(req, res, next) {
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
  router.get('/certificateOfFamilyStatus/:id',user_helpers.isLogin, function(req, res, next) {
    member.get_family_members(req.params.id,function(result){
      jsr.render({
        template: {
          content:  fs.readFileSync(path.join(__dirname, "../views/reports/certificateOfFamilyStatus.html"), "utf8"),
          phantom:{
            format: 'A4',
          },
          recipe: "phantom-pdf",
          helpers: certificateOfFamilyStatus.toString()
        },
        data:{Results : result}
      }).then(function (response) {
        response.result.pipe(res);
      });
    });
  });

  // this certificateSociaSituation // widght A4
  router.get('/certificateSociaSituation/:id',user_helpers.isLogin, function(req, res, next) {
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
  router.get('/deathCertificateTest',user_helpers.isLogin, function(req, res, next) {
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
  });

  function certificateOfFamilyStatus(data){
    if(data[0].Personal.Gender==1){
      var sir = 'السيد';
      var fname = 'ولقبه';
      var id_pirs = 'بطاقته';
      var father = 'والده';
      var mother = 'والدته';
      var family = 'عائلته';
    }else{
      var sir = 'السيدة';
      var fname = 'ولقبها';
      var id_pirs = 'بطاقتها';
      var father = 'والدها';
      var mother = 'والدتها';
      var family = 'عائلتها';
    }
    var html='';
      html+='<div class="row">\
      <div class="col-xs-8 col-xs-offset-4">\
        <div class="fontSizeOfficeName">\
          <div> مكتب السجل المدني <span>:</span>'+data[0].Family.Office.office_name+'</div>\
        </div>\
      </div>\
    </div>\
    <div class="row">\
      <div class="col-xs-4">\
        <p class="threee fontSizeBody">\
           رقم قيد الـعـائـلة <span>:</span>'+data[0].Family.Registrynumber+'<br>\
           رقم ورقة العائلة <span>:</span>'+data[0].Family.Recordnumber+'</p>\
      </div>\
      <div class="col-xs-8">\
        <h5 class="fontSize text-right">\
          شهادة بالوضع العائلي\
        </h5>\
      </div>\
    </div>\
    <div style="height: 9px;"></div>\
    <div class="panel rcorners3 fontSizeBody">\
      <div class="row">\
        <div class="col-xs-12">\
          <div class="ppppp"> يشهد مكتب السجل المدني بـ <span>:</span>'+data[0].Family.Office.office_name+'</div>\
        </div>\
      </div>\
      <div style="height: 9px;"></div>\
      <div class="row">\
        <div class="col-xs-8">\
          <div> بأن '+sir+' <span>:</span>'+data[0].Personal.Arabic_Firstname+' '+data[0].Personal.Arabic_Fathername+' '+data[0].Personal.Arabic_Grandfathername+ '</div>\
        </div>\
        <div class="col-xs-4">\
          <div> '+fname+' <span>:</span> '+data[0].Personal.Arabic_Familyname+' </div>\
        </div>\
      </div>\
      <div style="height: 9px;"></div>\
      <div class="row">\
        <div class="col-xs-4">\
          <div> ورقم '+id_pirs+' الشخصية <span>:</span> /////////// </div>\
        </div>\
        <div class="col-xs-4">\
          <div> وتاريخ صدورها <span>:</span> ////////// </div>\
        </div>\
        <div class="col-xs-4">\
          <div> وجه صدورها <span>:</span> ////////// </div>\
        </div>\
      </div>\
      <div style="height: 9px;"></div>\
      <div class="row">\
        <div class="col-xs-6">\
          <div> وأسم '+father+' <span>:</span> '+data[0].Personal.Arabic_Fathername+' '+data[0].Personal.Arabic_Grandfathername+' '+data[0].Personal.Arabic_Familyname+ ' </div>\
        </div>\
        <div class="col-xs-6">\
          <div> وأسم '+mother+' <span>:</span> '+data[0].Personal.Arabic_Motherfirstname+' '+data[0].Personal.Arabic_Motherfathername+' '+data[0].Personal.Arabic_Mothergrandfathername+ '</div></div>\
      </div>\
      <div style="height: 9px;"></div>\
      <div class="row">\
        <div class="col-xs-6">\
          <div> من منطقة <span>:</span> '+data[0].Personal.city_birth.city_name+' </div>\
        </div>\
        <div class="col-xs-6">\
          <div> مسجلة بالسجل المدني تحت رقم <span>:</span> '+data[0].Family.Registrynumber+' </div>\
        </div>\
      </div>\
      <div style="height: 9px;"></div>\
      <div class="row">\
        <div class="col-xs-12">\
          <div> وأن '+family+' تتألف كالاتي </div>\
        </div>\
      </div>\
      <div style="height: 11px;"></div>\
      <table class="table table-bordered fontSizeBody">\
        <tr>\
          <th> الرقم الوطني </th>\
          <th> الاسم </th>\
          <tH> اللقب </th>\
          <th> أسم الاب </th>\
          <th> أسم الام </th>\
          <th> صلة القرابة </th>\
          <th> تاريخ الميلاد </th>\
          <th> محل الميلاد </th>\
        </tr>';
        for ( i in data){
          var d = new Date(data[i].Personal.Birth_Date);
          if(data[i].Personal.national_id==null){
            var national_id = ''
          }else{
            var national_id = data[i].Personal.national_id;
          }
          html+= '<tr>\
              <td> '+national_id+' </td>\
              <td> '+data[i].Personal.Arabic_Firstname+' </td>\
              <td> '+data[i].Personal.Arabic_Familyname+' </td>\
              <td> '+data[i].Personal.Arabic_Fathername+' </td>\
              <td> '+data[i].Personal.Arabic_Motherfirstname+' '+data[i].Personal.Arabic_Motherfathername+' '+data[i].Personal.Arabic_Mothergrandfathername+ ' </td><td> '+data[i].Kinship.kinship_name+' </td>\
              <td> '+d.getDate()+' / '+parseFloat(d.getMonth()+1)+' / '+d.getFullYear()+'</td><td> '+data[0].Personal.city_birth.city_name+' </td>\
            </tr>';
        }
        html+= '</table>\
      <div style="height: 11px;"></div>\
      <div class="row">\
        <div class="col-xs-12">\
          <div> أعطيت هذه الشهادة بناء على طلبها وقيدت بسجل الشهادات رقم <span>:</span> //////////// </div>\
        </div>\
      </div>\
      <div style="height: 9px;"></div>\
      <div class="row">\
        <div class="col-xs-6">\
          <div> وصدرت بتاريخ <span>:</span> 27/05/2015 </div>\
        </div>\
        <div class="col-xs-6">\
          <div> الموافق <span>:</span> السابع والعشرون من مايو عام ألفان وخمسة عشر </div>\
        </div>\
      </div>';
    return html;
  }

}