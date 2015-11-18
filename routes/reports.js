var models = require("../models");
var user_helpers = require('../app/user_helpers');
module.exports = function (router) {
  var jsr = require("jsreport");
  var fs = require("fs");
  var path = require("path");
  var member = require('../app/member').member_mgr;
  var birth = require('../app/birth').birth_mgr;
  var personal=require('../app/personal').personal_mgr;
  var country=require('../app/country').country_mgr;
  var family = require('../app/family').family_mgr;
  var constants = require("../data/constants.json");
  var job = require('../app/job').job_mgr;
  var helpers = require('../app/helpers').helpers_mgr;
  var marriage= require('../app/marriage').marriage_mgr;
  var object_data_death={};
  router.post('/set_data_death/:id',user_helpers.isLogin, function(req, res, next) {
    object_data_death = {personalID:req.params.id,familyID:req.body.familyid}
    res.send(true);
  });

  function calculateAge (birthDate, otherDate) {
    birthDate = new Date(birthDate);
    otherDate = new Date(otherDate);

    var years = (otherDate.getFullYear() - birthDate.getFullYear());

    if (otherDate.getMonth() < birthDate.getMonth() || 
        otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
        years--;
    }

    return years;
}


  // this deathCertificate // widght A4
  router.get('/deathCertificate',user_helpers.isLogin, function(req, res, next) {
    console.log(object_data_death);
    var personal_id=object_data_death.personalID;
    personal.get_personal_only(personal_id,0,function(personal){
   // console.log(personal.personal[0].dataValues);
    var name =personal.personal[0].dataValues.Arabic_Firstname;
    var father_name=personal.personal[0].dataValues.Arabic_Fathername;
    var grand_name=personal.personal[0].dataValues.Arabic_Grandfathername;
    var family_name=personal.personal[0].dataValues.Arabic_Familyname;
    var full_name=name+" "+father_name+" "+grand_name+" "+family_name;
    var gender=personal.personal[0].dataValues.Gender;
    var Birth_Date=personal.personal[0].dataValues.Birth_Date;
    var nationality_id=personal.personal[0].dataValues.Nationality_Id;
    var relgion=personal.personal[0].dataValues.Religion_Id;
    var day,month,year;
    if(gender==1){
      gender="ذكر";
    } else if(gender==2){
      gender="انثي";
    }

    if(personal.personal[0] != undefined){
      day=Birth_Date.getDate();
      month=Birth_Date.getMonth()+1;
      year=Birth_Date.getFullYear();
    }
 

    var relgion_txt;
    if(personal.personal[0].dataValues.Gender==1){
    if(relgion==1){
      relgion_txt="مسلم";
    } else if(relgion==2){
      relgion_txt="مسيحي";
    } else if(relgion==3){
      relgion_txt="يهودي";
    }
  } else if(personal.personal[0].dataValues.Gender==2){
    if(relgion==1){
      relgion_txt="مسلمة";
    } else if(relgion==2){
      relgion_txt="مسيحية";
    } else if(relgion==3){
      relgion_txt="يهودية";
    }

  }
    var curntDate=new Date();
    console.log(day+"/"+month+"/"+year);
    console.log(curntDate.getDate()+"/"+curntDate.getMonth()+"/"+curntDate.getFullYear());
    var daycurent=curntDate.getDate();
    var monthcurent=curntDate.getMonth();
    var yearcurent=curntDate.getFullYear();
    var newdate=(curntDate.getMonth()+1)+"/"+curntDate.getDate()+"/"+curntDate.getFullYear();
    var age=calculateAge(month+"/"+day+"/"+year,newdate);
    console.log(age);
    console.log(nationality_id);
    country.get_country_by_country_id(nationality_id,0,function(country){
    console.log(country.father_nat[0].dataValues);
      var nationality_txt;
      if(personal.personal[0].dataValues.Gender==1){
        nationality_txt=country.father_nat[0].dataValues.nationality_male;
      } else if(personal.personal[0].dataValues.Gender==2){
        nationality_txt=country.father_nat[0].dataValues.nationality_female;
      }
     jsr.render({
      template: {
        content:  fs.readFileSync(path.join(__dirname, "../views/reports/deathCertificate.html"), "utf8"),
        phantom:{
          format: 'A4',
        },
        recipe: "phantom-pdf",
      },
       data:{full_name:full_name,
            family_name:family_name,
            gender:gender,
            day:day,
            month:month,
            year:year, 
            age:age,
            nationality_txt:nationality_txt,
            relgion_txt:relgion_txt}
    }).then(function (response) {
      response.result.pipe(res);
    });});
  });
  });

  //set_data
  var object_data={};
  router.post('/set_data/:id',user_helpers.isLogin, function(req, res, next) {
    object_data = {personalID:req.params.id,familyID:req.body.familyid}
    res.send(true);
  });

 

  // this deathCertificate // widght A4
  router.get('/birthCertificate/',user_helpers.isLogin, function(req, res, next) {
    var father_nationalty,mother_nationalty=0;
    var father_id,mother_id=0;
    var alert_for_report = "لا توجد بيانات";
    birth.get_birth(object_data.personalID,function(birth){
      family.get_family_by_id(object_data.familyID,function(family){
        if(birth!=null){
          father_nationalty=birth.dataValues.Personal.dataValues.Fathernationality_Id;
          mother_nationalty=birth.dataValues.Personal.dataValues.Mothernationality_Id;
        }
        country.get_country_by_country_id(father_nationalty,mother_nationalty,function(country){
          if(birth!=null){
            father_id=birth.dataValues.Personal.dataValues.Fatherperson_Id;
            mother_id=birth.dataValues.Personal.dataValues.Motherperson_Id;
          }
          personal.get_personal_only(father_id,mother_id,function(personal){
            var jobId,jobId_mother;
            if(birth!=null){
             jobId=personal.personal[0].dataValues.JobId;
             jobId_mother=personal.mother.rows[0].dataValues.JobId;
            }
            job.get_job_by_id(jobId,jobId_mother,function(job){
              var personal_id=0;
              if(personal.personal[0]!=undefined){
                alert_for_report="شهادة ميلاد";
                personal_id=personal.personal[0].dataValues.id;
              }
              marriage.get_marriage_by_id(personal_id,function(marriage){
                var mardate,marriage_date;
                if(marriage[0]!=undefined){
                  mardate=marriage[0].dataValues.marriage_date;
                  marriage_date=mardate.getFullYear()+"/"+mardate.getMonth()+"/"+mardate.getDate();
                }
                var string_reg_doc_type="لايوجد";
                var string_gender ="";
                var country_name,country_name_mother,reg_doc_type,name,mother_father_name,mother_grand_name,mother_sir_name,father,grand,sirname;
                var birth_num,informer_type,informer_address,informer_name,job_name_mother,mother_name,birth_place,gender,birth_type,job_name,Religion_Id,mother_sirname,mother_name,religion;
                var birth_date=new Date();
                if(personal.mother.rows[0]!=undefined){
                  alert_for_report="شهادة ميلاد";
                   mother_name=personal.mother.rows[0].dataValues.Arabic_Firstname;
                   mother_father_name=personal.mother.rows[0].dataValues.Arabic_Fathername;
                   mother_grand_name=personal.mother.rows[0].dataValues.Arabic_Grandfathername;
                   mother_sir_name=personal.mother.rows[0].dataValues.Arabic_Familyname;
                  mother_name=mother_name+" "+mother_father_name+" "+mother_grand_name;
                  mother_sirname=mother_sir_name;
                }
                if(personal.personal[0]!=undefined){
                Religion_Id=personal.personal[0].dataValues.Religion_Id;
              }
                if(birth!=null){
                  informer_type=birth.dataValues.informer_type;
                  informer_address=birth.dataValues.informer_address;
                  informer_name=birth.dataValues.informer_name;
                  alert_for_report="شهادة ميلاد";
                  reg_doc_type=birth.dataValues.Personal.dataValues.Regdoctype_Id;
                  birth_num=birth.dataValues.birth_type;
                  name = birth.dataValues.Personal.dataValues.Arabic_Firstname;
                  father=birth.dataValues.Personal.dataValues.Arabic_Fathername;
                  grand =birth.dataValues.Personal.dataValues.Arabic_Grandfathername;
                  sirname= birth.dataValues.Personal.dataValues.Arabic_Familyname;
                  birth_date=birth.dataValues.Personal.dataValues.Birth_Date;
                  birth_place =birth.dataValues.Personal.dataValues.Birth_Place;
                  gender =birth.dataValues.Personal.dataValues.Gender;
                 }
                 if(country.father_nat[0]!=undefined){
                  country_name=country.father_nat[0].dataValues.nationality_male; 
                  }

                  if(country.mother_nat[0]!=undefined){
                    country_name_mother=country.mother_nat[0].dataValues.nationality_female; 
                  }
                  if(Religion_Id!=undefined){
                    religion=constants.religion[Religion_Id][0];
                  }
                  if(job.father_job.rows[0]!=undefined){
                    job_name=job.father_job.rows[0].dataValues.job_name;
                  }
                  if(job.mother_job.rows[0]!=undefined){
                    job_name_mother=job.mother_job.rows[0].dataValues.job_name;
                  }
                  if(birth_num==1){
                    birth_type="فردية";
                  } else if(birth_num==2){
                    birth_type="توأم";
                  }
                  if(informer_type==1){
                    informer_type="فردية";
                  } else if(informer_type==2){
                    informer_type="زوجية";
                  }
                  if(gender==1){
                    string_gender="ذكر";
                  } else if(gender==2){
                    string_gender="انثي";
                  }
                  if(reg_doc_type==1)
                  {
                    string_reg_doc_type="منذ الولادة";
                  } else if(reg_doc_type==2){
                    string_reg_doc_type="شهادة جنسية";
                  } else if(reg_doc_type==3){ 
                    string_reg_doc_type="غير مقيد/ة";
                  }
                helpers.date_later(birth_date,function(ardate){
                jsr.render({
                  template: {
                    content:  fs.readFileSync(path.join(__dirname, "../views/reports/birthCertificate.html"), "utf8"),
                    phantom:{
                      format: 'A4',
                    },
                    recipe: "phantom-pdf",
                  },
                 data:{Registrynumber:family.result.rows[0].Registrynumber,
                       Recordnumber:family.result.rows[0].Recordnumber,
                       office_name:family.result.rows[0].Office.office_name,
                       Regdoctype:string_reg_doc_type,
                       name:name,
                       father:father,
                       grand:grand,
                       sirname:sirname,
                       birth_date_day:birth_date.getDate(),
                       birth_date_month:(birth_date.getMonth()+1),
                       birth_date_year:birth_date.getFullYear(),
                       birth_date_latter:ardate,
                       birth_place:birth_place,
                       string_gender:string_gender,
                       birth_type:birth_type,
                       country_name:country_name,
                       job_name:job_name,
                       religion:religion,
                       marriage_date:marriage_date,
                       mother_name:mother_name,
                       mother_sirname: mother_sirname,
                       alert_for_report:alert_for_report,
                       country_name_mother:country_name_mother,
                       job_name_mother:job_name_mother,
                       informer_name:informer_name,
                       informer_address:informer_address,
                       informer_type:informer_type
                      }
                  }).then(function (response) {
                    response.result.pipe(res);
                  }); 
                }); 
              }); 
            }); 
          });
        });
      }); 
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