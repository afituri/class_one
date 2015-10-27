$(document).ready(function(){
  $('body').on('click', '#edit_personal_data', function (e) {
    $('#edit_personal_btn').val($(this).val());
    $.get('/get_Personal/'+$(this).val(),function(result){
      if(result.personal[0].Is_Alive==1){
        $('#Is_Alive_edit').prop('checked',true).change() ;
      } else {
        $('#Is_Alive_edit').prop('checked',false).change() ;
      }
      $('#Arabic_Firstname_edit').val(result.personal[0].Arabic_Firstname);
      $('#Arabic_Fathername_edit').val(result.personal[0].Arabic_Fathername);
      $('#Arabic_Grandfathername_edit').val(result.personal[0].Arabic_Grandfathername);
      $('#Arabic_Familyname_edit').val(result.personal[0].Arabic_Familyname);
      $('#Gender_edit').selectpicker('val',result.personal[0].Gender);
      if(result.personal[0].Gender==1){
        $('#Religion_Id_edit').empty();
        $.get('/get_religion',function(resul){ 
          for(i in resul){
            $('#Religion_Id_edit').append("<option value = '"+i+"'>"+resul[i][0]+"</option>").selectpicker('refresh');
          }
          $('#Religion_Id_edit').selectpicker('val',result.personal[0].Religion_Id);
        });
        $('#Socialstatus_Id_edit').empty();
        $.get('/get_social',function(resul){ 
          for(i in resul){
            $('#Socialstatus_Id_edit').append("<option value = '"+i+"'>"+resul[i][0]+"</option>").selectpicker('refresh');
          }
          $('#Socialstatus_Id_edit').selectpicker('val',result.personal[0].Socialstatus_Id);
        });
        $('#Nationality_Id_edit').empty();
       // $('#Certification_Type_Id_edit').empty();  
        $.get('/get_country',function(resul){ 
          for(i in resul){
            $('#Nationality_Id_edit').append("<option value = '"+resul[i].id+"'>"+resul[i].nationality_male+"</option>").selectpicker('refresh');
           // $('#Certification_Type_Id_edit').append("<option value = '"+resul[i].id+"'>"+resul[i].nationality_male+"</option>").selectpicker('refresh');
          }
           $('#Nationality_Id_edit').selectpicker('val',result.personal[0].Nationality_Id);
        });
      } else {
        $('#Religion_Id_edit').empty();
        $.get('/get_religion',function(res){ 
          for(i in res){
            $('#Religion_Id_edit').append("<option value = '"+i+"'>"+res[i][1]+"</option>").selectpicker('refresh');
          }
          $('#Religion_Id_edit').selectpicker('val',result.personal[0].Religion_Id);
        });
        $('#Socialstatus_Id_edit').empty();
        $.get('/get_social',function(resu){ 
          for(i in resu){
            $('#Socialstatus_Id_edit').append("<option value = '"+i+"'>"+resu[i][1]+"</option>").selectpicker('refresh');
          }
           $('#Socialstatus_Id_edit').selectpicker('val',result.personal[0].Socialstatus_Id);          
        });
        $('#Nationality_Id_edit').empty();
        $('#Certification_Type_Id_edit').empty();  
        $.get('/get_country',function(resul){ 
          for(i in resul){
            $('#Nationality_Id_edit').append("<option value = '"+resul[i].id+"'>"+resul[i].nationality_female+"</option>").selectpicker('refresh');
            $('#Certification_Type_Id_edit').append("<option value = '"+resul[i].id+"'>"+resul[i].nationality_female+"</option>").selectpicker('refresh');
          }
          $('#Nationality_Id_edit').selectpicker('val',result.personal[0].Nationality_Id);
        });
      }
      $.get('/get_country/'+result.personal[0].city_Id,function(resultt){
         $('#country_edit').selectpicker('val',resultt.result2[0].id);
         $('#city_id_edit').empty();
         $('#city_id_edit').append("<option value=\"\"> اختار المدينة </option>").selectpicker('refresh');
        $.get('/personal/get_city/'+resultt.result2[0].id,function(result){ 
          for(i in result){
            var x=result[i].id;
            $('#city_id_edit').append("<option value ="+x+">"+result[i].city_name+"</option>").selectpicker('refresh');
          }
          $('#city_id_edit').selectpicker('val',resultt.result1[0].id);
        });
      });
      $('#Birth_Place_edit').val(result.personal[0].Birth_Place);
      var bdate=new Date(result.personal[0].Birth_Date);
      $('#Birth_Date_edit').val(bdate.getFullYear()+"/"+(bdate.getMonth()+1)+"/"+bdate.getDate());
      var Edate=new Date(result.personal[0].Enlistingdate);
      $('#Enlistingdate_edit').val(Edate.getFullYear()+"/"+(Edate.getMonth()+1)+"/"+Edate.getDate());
      $('#kinship_edit').selectpicker('val',result.member[0].KinshipId);
      $('#Mothernationality_Id_edit').selectpicker('val',result.personal[0].Mothernationality_Id);
      $('#Fathernationality_Id_edit').selectpicker('val',result.personal[0].Fathernationality_Id);
      $('#JobId_edit').selectpicker('val',result.personal[0].JobId);
      if(result.personal[0].Motherperson_Id==null){
        $('#mother_status_edit').selectpicker('val',2);
         $("#insert_mother_name_edit").removeClass("hide");
        $("#select_mother_name_edit").addClass("hide");
        $("#Arabic_Motherfirstname_edit").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء ادخال اسم اﻷم!</h6>",
          }
        });
        $("#Arabic_Motherfathername_edit").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء ادخال والد اﻷم!</h6>",
          }
        });   
        $("#Arabic_Mothergrandfathername_edit").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء ادخال جد اﻷم!</h6>",
          }
        });
        $("#Arabic_Motherfamilyname_edit").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء ادخال لقب اﻷم!</h6>",
          }
        });
        $("#Motherperson_Id_edit").rules( 'remove', 'required' );
      } else {
        $('#mother_status_edit').selectpicker('val',1);
       $("#select_mother_name_edit").removeClass("hide");
        $("#insert_mother_name_edit").addClass("hide");
        $("#Motherperson_Id_edit").rules("add", {
          required: true,
          messages: {
            required: "الرجاء اختيار اسم اﻷم!",
          }
        });
        $("#Arabic_Motherfirstname_edit").rules( 'remove', 'required' );
        $("#Arabic_Motherfathername_edit").rules( 'remove', 'required' );
        $("#Arabic_Mothergrandfathername_edit").rules( 'remove', 'required' );
        $("#Arabic_Motherfamilyname_edit").rules( 'remove', 'required' );
      }
      if(result.member[0].KinshipId==3){
      $('#three_edit').hide();
      var path=document.URL;
      var familyid=path.split('/').pop();
      $('#Motherperson_Id_edit').empty();
      $('#Motherperson_Id_edit').append('<option value="">اختر اسم اﻷم بالكامل </option>').selectpicker('refresh');
      $.get('/get_Personal_in_family/'+familyid,function(resul){
      for(i in resul){
        if(resul[i].KinshipId==2){ 
          $('#Motherperson_Id_edit').append('<option value='+resul[i].pid+'  > '+resul[i].Arabic_Firstname+' '+resul[i].Arabic_Fathername+' '+resul[i].Arabic_Grandfathername+' '+resul[i].Arabic_Familyname+' </option>').selectpicker('refresh');;
        } 
        }
        $('#Motherperson_Id_edit').selectpicker('val',result.personal[0].Motherperson_Id);
      });   
      $('#Arabic_Motherfirstname_edit').val(result.personal[0].Arabic_Motherfirstname);
      $('#Arabic_Motherfathername_edit').val(result.personal[0].Arabic_Motherfathername);
      $('#Arabic_Mothergrandfathername_edit').val(result.personal[0].Arabic_Mothergrandfathername);
      $('#Arabic_Motherfamilyname_edit').val(result.personal[0].Arabic_Motherfamilyname);   
    } else {
      // family from last jop
      var family_from=result.member[0].from_familyId; 
      $.get('/get_family_by_id/'+family_from,function(result){
        $('#family_Registrynumber_edit').val(result.result.rows[0].Registrynumber);
        var Is_Closed=result.result.rows[0].Is_Closed;
        if(Is_Closed==1){
          Is_Closed="نشطة";
        }
        if(Is_Closed==2){
          Is_Closed="غير نشطة";
        }
        var FamilyType = result.result.rows[0].FamilyType;
        if(FamilyType==1){
          FamilyType="ليبية";
        }
        if(FamilyType==2){
         FamilyType="مؤقته"; 
        }
        if(FamilyType==3){
         FamilyType="اجانب"; 
        }   
      $('#family_table_edit').empty();   
      $('#family_table_edit').append("<tr><td class=text-center>"+result.result.rows[0].id+"</td><td class=text-center>"+result.result.rows[0].Registrynumber+"</td><td class=text-center>"+result.result.rows[0].Recordnumber+"</td><td class=text-center>"+result.result.rows[0].Autogenerated_Id+"</td><td class=text-center>"+Is_Closed+"</td><td class=text-center>"+FamilyType+"</td><td class=text-center>"+result.result.rows[0].Office.office_name+"</td><td class=text-center><p data-placement=\"top\" data-toggle=\"tooltip\" title=\"أختار\"><input value="+result.result.rows[0].id+" id=\"family_come_from\" type=\"radio\" name=\"family_come_from\" class=\"radioBtnClass\"/></p></td></tr>");
      });
      $('#three_edit').show();
      $('#Motherperson_Id_edit').empty();
      $('#Motherperson_Id_edit').append('<option value="">اختر اسم اﻷم بالكامل </option>').selectpicker('refresh');
      $.get('/get_Personal_in_family/'+result.member[0].from_familyId,function(resul){
      for(i in resul){
        if(resul[i].KinshipId==2){ 
          $('#Motherperson_Id_edit').append('<option value='+resul[i].pid+'  > '+resul[i].Arabic_Firstname+' '+resul[i].Arabic_Fathername+' '+resul[i].Arabic_Grandfathername+' '+resul[i].Arabic_Familyname+' </option>').selectpicker('refresh');;
        } 
        }
        $('#Motherperson_Id_edit').selectpicker('val',result.personal[0].Motherperson_Id);
      });
      
      $('#Arabic_Motherfirstname_edit').val(result.personal[0].Arabic_Motherfirstname);
      $('#Arabic_Motherfathername_edit').val(result.personal[0].Arabic_Motherfathername);
      $('#Arabic_Mothergrandfathername_edit').val(result.personal[0].Arabic_Mothergrandfathername);
      $('#Arabic_Motherfamilyname_edit').val(result.personal[0].Arabic_Motherfamilyname);   
    }
    $('#Regdoctype_Id_edit').selectpicker('val',result.personal[0].Regdoctype_Id);
    if(result.personal[0].Regdoctype_Id==2){
       $(".box").show().addClass("animated fadeIn");
        $("#Certification_Type_Id_edit").rules("edit", {
          required: true,
          messages: {
            required: "<h6>الرجاء اختيار نوع الجنسية!</h6>",
          }
        });   
        $("#Certification_Issuance_Date_edit").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء ادخال تاريخ الجنسية!</h6>",
          }
        });
        $("#Certification_File_Number_edit").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء ادخال رقم الملف!</h6>",
          }
        });
        $("#CertificationMber_edit").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء ادخال رقم الشهادة!</h6>",
          }
        });
    } else{
       $(".box").hide(300);
        $("#Certification_Type_Id_edit").rules( 'remove', 'required' );
        $("#Certification_Issuance_Date_edit").rules( 'remove', 'required' );
        $("#Certification_File_Number_edit").rules( 'remove', 'required' );
        $("#CertificationMber_edit").rules( 'remove', 'required' );
    }
    $('#Certification_Type_Id_edit').selectpicker('val',result.personal[0].Certification_Type_Id);
    cer_date=new Date(result.personal[0].Certification_Issuance_Date);
    $('#Certification_Issuance_Date_edit').val(cer_date.getFullYear()+"/"+(cer_date.getMonth()+1)+"/"+cer_date.getDate());
    $('#Certification_File_Number_edit').val(result.personal[0].Certification_File_Number);
    $('#CertificationMber_edit').val(result.personal[0].CertificationMber);
    }); 
   });

   $('body').on('click', '#edit_personal_btn', function (e) {
     e.preventDefault();
    $('#edit_personal_form').submit();
   });

   $('#edit_personal_form').submit(function(e) {
    e.preventDefault();
    var isvalidate=$("#edit_personal_form").valid();
/*    alert($('#edit_personal_btn').val());
    alert(isvalidate);*/

    if(isvalidate){
      if($("input[type='radio'].radioBtn").is(':checked')) {
      get_famly_fromId= $("input[type='radio'].radioBtn:checked").val();
    } else {
      get_famly_fromId=-1;
    }
      var path=document.URL;
      var familyid=path.split('/').pop();
      var Is_Alive;
      if($("#Is_Alive_edit").is(":checked")==true){
        Is_Alive=1;
      } else { 
        Is_Alive=2;
      }
      obj={
        mother_status:$('#mother_status_edit').val(),
        Is_Alive :Is_Alive,
        national_id:$('#national_id_edit').val(),
        Arabic_Firstname: $('#Arabic_Firstname_edit').val() ,
        Arabic_Fathername: $('#Arabic_Fathername_edit').val(),
        Arabic_Grandfathername: $('#Arabic_Grandfathername_edit').val() ,
        Arabic_Familyname: $('#Arabic_Familyname_edit').val(),
        Arabic_Motherfirstname:$('#Arabic_Motherfirstname_edit').val(),
        Arabic_Motherfathername:$('#Arabic_Motherfathername_edit').val(),
        Arabic_Mothergrandfathername:$('#Arabic_Mothergrandfathername_edit').val(),
        Arabic_Motherfamilyname:$('#Arabic_Motherfamilyname_edit').val(),
        Birth_Date:$('#Birth_Date_edit').val(),
        Birth_Place:$('#Birth_Place_edit').val(),
        Gender : $('#Gender_edit').val(),
        Religion_Id : $('#Religion_Id_edit').val(),
        Enlistingdate: $('#Enlistingdate_edit').val(),
        Socialstatus_Id : $('#Socialstatus_Id_edit').val(),
        KinshipId: $('#kinship_edit').val(),
        Mothernationality_Id : $('#Mothernationality_Id_edit').val(),
        Fathernationality_Id : $('#Fathernationality_Id_edit').val(),
        JobId : $('#JobId_edit').val(),
        Arabic_Motherfirstname: $('#Arabic_Motherfirstname_edit').val(),
        Arabic_Motherfathername: $('#Arabic_Motherfathername_edit').val(),
        Arabic_Mothergrandfathername: $('#Arabic_Mothergrandfathername_edit').val(),
        Arabic_Motherfamilyname: $('#Arabic_Motherfamilyname_edit').val(),
        Motherperson_Id: $('#Motherperson_Id_edit').val(),
        Regdoctype_Id: $('#Regdoctype_Id_edit').val(),
        Certification_Type_Id: $('#Certification_Type_Id_edit').val(),
        Certification_Issuance_Date: $('#Certification_Issuance_Date_edit').val(),
        Certification_File_Number: $('#Certification_File_Number_edit').val(),
        CertificationMber: $('#CertificationMber_edit').val(),
        Nationality_Id:$('#Nationality_Id_edit').val(),
        Motherperson_Id:$('#Motherperson_Id_edit').val(),
        city_Id : $('#city_id_edit').val(),
        from_familyId:get_famly_fromId,
        personalId:$('#edit_personal_btn').val(),
      }
    $.post('/edit_personal',obj,function(result){ 
          window.location.href='/personal/'+familyid+"?msg=3";
      });
    }
  });

    $('body').on('change', '#kinship_edit', function(e){
    var path=document.URL;
    var familyid=path.split('/').pop();
    $('#Motherperson_Id_edit').empty();
    if($(this).val()==3){
      $('#three_edit').hide();
      $('#Motherperson_Id_edit').append('<option value="">اختر اسم اﻷم بالكامل </option>').selectpicker('refresh');
      $.get('/get_Personal_in_family/'+familyid,function(result){
        for(i in result){
          if(result[i].KinshipId==2){ 
            //$('#three').hide();
            $('#Motherperson_Id_edit').append('<option value='+result[i].pid+'  > '+result[i].Arabic_Firstname+' '+result[i].Arabic_Fathername+' '+result[i].Arabic_Grandfathername+' '+result[i].Arabic_Familyname+' </option>').selectpicker('refresh');;
          } 
        }
       });
    } else { 
      $('#Motherperson_Id_edit').empty();
      $('#Motherperson_Id_edit').append('<option value="">اختر اسم اﻷم بالكامل </option>').selectpicker('refresh');
      $('#three_edit').show();
    }
  });




  $('body').on('click', '#add_personal_btn', function (e) {
    e.preventDefault();
    $('#add_personal_form').submit();
  });
  
  $('body').on('click', '#remove', function(e){
    var path=document.URL;
    var familyid=path.split('/').pop();
    //alert(familyid);
     $('#saveUrl').val(familyid);
    $('#delete_it').val($(this).val());
  });

  $('body').on('click', '#delete_it', function(e){
    var path=document.URL;
    var familyid=path.split('/').pop();
   // alert($('#saveUrl').val());
    window.location.href='/personal/'+familyid+'?msg=1'; 
    $.get('/delete_personal/'+$(this).val(),function(result){ 
         window.location.href='/personal/'+familyid+"?msg=1"; 
    });
  });

  /*var path=document.URL;
  var pathId=path.split('/').pop();*/
   if ($getMsg["msg"]==1){
    custNotify("success","نجاح","تــم حذف الفرد بنجاح","ok-sign","bounceInDown","bounceOutUp");
    var path=document.URL;
    var familyid=path.split('/').pop();
    var id=familyid.replace("?msg=1","");
   replaceUrl('/personal/'+id);    
  } else if ($getMsg["msg"]==2) {
    custNotify("success","نجاح","تــم اضافة الفرد بنجاح","ok-sign","bounceInDown","bounceOutUp");
    var path=document.URL;
    var familyid=path.split('/').pop();
    var id=familyid.replace("?msg=2","");
    replaceUrl('/personal/'+id);
  } else if ($getMsg["msg"]==3) {
    custNotify("success","نجاح","تــم تـعديل الفرد بنجاح","ok-sign","bounceInDown","bounceOutUp");
    var path=document.URL;
    var familyid=path.split('/').pop();
    var id=familyid.replace("?msg=3","");
    replaceUrl('/personal/'+id);
  }

  

 var get_famly_fromId;
  $('body').on('click', '#family_come_from', function(e){
    if($("input[type='radio'].radioBtnClass").is(':checked')) {
      get_famly_fromId= $("input[type='radio'].radioBtnClass:checked").val();
      $('#Motherperson_Id').empty();
      $('#Motherperson_Id').append('<option value="">اختر اسم اﻷم بالكامل </option>').selectpicker('refresh');
      $.get('/get_Personal_in_family/'+get_famly_fromId,function(result){
        for(i in result){
            if(result[i].KinshipId==2){ 
              $('#Motherperson_Id').append('<option value='+result[i].pid+'  > '+result[i].Arabic_Firstname+' '+result[i].Arabic_Fathername+' '+result[i].Arabic_Grandfathername+' '+result[i].Arabic_Familyname+' </option>').selectpicker('refresh');;
            } 
          }
      });
    }
  });

  var get_famly_fromId_edit;
  $('body').on('click', '#family_come_from_edit', function(e){
    if($("input[type='radio'].radioBtn").is(':checked')) {
      get_famly_fromId_edit= $("input[type='radio'].radioBtn:checked").val();
      $('#Motherperson_Id_edit').empty();
      $('#Motherperson_Id_edit').append('<option value="">اختر اسم اﻷم بالكامل </option>').selectpicker('refresh');
      $.get('/get_Personal_in_family/'+get_famly_fromId_edit,function(result){
        for(i in result){
            if(result[i].KinshipId==2){ 
              $('#Motherperson_Id_edit').append('<option value='+result[i].pid+'  > '+result[i].Arabic_Firstname+' '+result[i].Arabic_Fathername+' '+result[i].Arabic_Grandfathername+' '+result[i].Arabic_Familyname+' </option>').selectpicker('refresh');;
            } 
          }
      });
    }
  });

  //#kinship
  $('body').on('change', '#kinship', function(e){
    var path=document.URL;
    var familyid=path.split('/').pop();
    $('#Motherperson_Id').empty();
    if($(this).val()==3){
      $('#three').hide();
      $('#Motherperson_Id').append('<option value="">اختر اسم اﻷم بالكامل </option>').selectpicker('refresh');
      $.get('/get_Personal_in_family/'+familyid,function(result){
        for(i in result){
          if(result[i].KinshipId==2){ 
            //$('#three').hide();
            $('#Motherperson_Id').append('<option value='+result[i].pid+'  > '+result[i].Arabic_Firstname+' '+result[i].Arabic_Fathername+' '+result[i].Arabic_Grandfathername+' '+result[i].Arabic_Familyname+' </option>').selectpicker('refresh');;
          } 
        }
       });
    } else { 
      $('#Motherperson_Id').empty();
      $('#Motherperson_Id').append('<option value="">اختر اسم اﻷم بالكامل </option>').selectpicker('refresh');
      $('#three').show();
    }
  });

  $('#add_personal_form').submit(function(e) {
    e.preventDefault();
    var isvalidate=$("#add_personal_form").valid();
    if(isvalidate){ 
      if($("input[type='radio'].radioBtnClass").is(':checked')) {
        get_famly_fromId= $("input[type='radio'].radioBtnClass:checked").val();
      }
      var path=document.URL;
      var familyid=path.split('/').pop();
      var Is_Alive;
      if($("#Is_Alive").is(":checked")==true){
        Is_Alive=1;
      } else { 
        Is_Alive=2;
      }
      var PersonalType;
      if($("#type1").is(":checked")==true){
        PersonalType=1;
      } 
      if($("#type2").is(":checked")==true){
        PersonalType=2; 
      }
      if($("#type3").is(":checked")==true){
        PersonalType=3;
      }

      obj={
        PersonalType : PersonalType,
        Is_Alive :Is_Alive,
        national_id:$('#national_id').val(),
        Arabic_Firstname: $('#Arabic_Firstname').val() ,
        Arabic_Fathername: $('#Arabic_Fathername').val(),
        Arabic_Grandfathername: $('#Arabic_Grandfathername').val() ,
        Arabic_Familyname: $('#Arabic_Familyname').val(),
        Arabic_Motherfirstname:$('#Arabic_Motherfirstname').val(),
        Arabic_Motherfathername:$('#Arabic_Motherfathername').val(),
        Arabic_Mothergrandfathername:$('#Arabic_Mothergrandfathername').val(),
        Arabic_Motherfamilyname:$('#Arabic_Motherfamilyname').val(),
        Birth_Date:$('#Birth_Date').val(),
        Birth_Place:$('#Birth_Place').val(),
        Gender : $('#Gender').val(),
        Religion_Id : $('#Religion_Id').val(),
        Enlistingdate: $('#Enlistingdate').val(),
        Socialstatus_Id : $('#Socialstatus_Id').val(),
        KinshipId: $('#kinship').val(),
        Mothernationality_Id : $('#Mothernationality_Id').val(),
        Fathernationality_Id : $('#Fathernationality_Id ').val(),
        JobId : $('#JobId').val(),
        Arabic_Motherfirstname: $('#Arabic_Motherfirstname').val(),
        Arabic_Motherfathername: $('#Arabic_Motherfathername').val(),
        Arabic_Mothergrandfathername: $('#Arabic_Mothergrandfathername').val(),
        Arabic_Motherfamilyname: $('#Arabic_Motherfamilyname').val(),
        Motherperson_Id: $('#Motherperson_Id').val(),
        Regdoctype_Id: $('#Regdoctype_Id').val(),
        Certification_Type_Id: $('#Certification_Type_Id').val(),
        Certification_Issuance_Date: $('#Certification_Issuance_Date').val(),
        Certification_File_Number: $('#Certification_File_Number').val(),
        CertificationMber: $('#CertificationMber').val(),
        Nationality_Id:$('#Nationality_Id').val(),
        Motherperson_Id:$('#Motherperson_Id').val(),
        city_Id : $('#city_id').val(),
        from_familyId:get_famly_fromId,
      }
      $.post('/insert_personal',obj,function(result){ 
          window.location.href='/personal/'+familyid+"?msg=2";
      });
    } else {
      var isValid = $("#add_personal_form").valid();
      if (this.hasChildNodes('.nav.nav-tabs')) {
        var validator = $(this).validate();
        $("#add_personal_form").find("input").each(function () {
          if (!validator.element(this)) {
            isValid = false;
            $('a[href=#' + $(this).closest('.tab-pane:not(.active)').attr('id') + ']').tab('show');
            return false;
          }
        });
      }
    }
  });

  $("[name='family_type'],[name='Is_Alive']").bootstrapSwitch();

  $("#country").change(function(){
    $('#city_id').empty();
    $.get('/personal/get_city/'+$(this).val(),function(result){ 
      for(i in result){
        var x=result[i].id;
        $('#city_id').append("<option value ='"+x+"'>"+result[i].city_name+"</option>").selectpicker('refresh');
      }
    });
  });

   $("#country_edit").change(function(){
    $('#city_id_edit').empty();
    $.get('/personal/get_city/'+$(this).val(),function(result){ 
      for(i in result){
        var x=result[i].id;
        $('#city_id_edit').append("<option value ='"+x+"'>"+result[i].city_name+"</option>").selectpicker('refresh');
      }
    });
  });

  $('body').on('input','#family_Registrynumber', function(){
    $('#family_table').empty();
    $.get('/get_registry/'+$('#family_Registrynumber').val(),function(result){
      for(i in result){
        var Is_Closed=result[i].Is_Closed;
        if(Is_Closed==1){
          Is_Closed="نشطة";
        }
        if(Is_Closed==2){
          Is_Closed="غير نشطة";
        }
        var FamilyType = result[i].FamilyType;
        if(FamilyType==1){
          FamilyType="ليبية";
        }
        if(FamilyType==2){
         FamilyType="مؤقته"; 
        }
        if(FamilyType==3){
         FamilyType="اجانب"; 
        }
        $('#family_table').append("<tr><td class=text-center>"+result[i].fid+"</td><td class=text-center>"+result[i].Registrynumber+"</td><td class=text-center>"+result[i].Recordnumber+"</td><td class=text-center>"+result[i].Autogenerated_Id+"</td><td class=text-center>"+Is_Closed+"</td><td class=text-center>"+FamilyType+"</td><td class=text-center>"+result[i].office_name+"</td><td class=text-center><p data-placement=\"top\" data-toggle=\"tooltip\" title=\"أختار\"> \
          <input value="+result[i].fid+" id=\"family_come_from\" type=\"radio\" name=\"family_come_from\" class=\"radioBtnClass\"/> \
          </p></td></tr>");
      } 
    });
  });

   $('body').on('input','#family_Registrynumber_edit', function(){
    $('#family_table_edit').empty();
    $.get('/get_registry/'+$('#family_Registrynumber_edit').val(),function(result){
      for(i in result){
        var Is_Closed=result[i].Is_Closed;
        if(Is_Closed==1){
          Is_Closed="نشطة";
        }
        if(Is_Closed==2){
          Is_Closed="غير نشطة";
        }
        var FamilyType = result[i].FamilyType;
        if(FamilyType==1){
          FamilyType="ليبية";
        }
        if(FamilyType==2){
         FamilyType="مؤقته"; 
        }
        if(FamilyType==3){
         FamilyType="اجانب"; 
        }
        $('#family_table_edit').append("<tr><td class=text-center>"+result[i].fid+"</td><td class=text-center>"+result[i].Registrynumber+"</td><td class=text-center>"+result[i].Recordnumber+"</td><td class=text-center>"+result[i].Autogenerated_Id+"</td><td class=text-center>"+Is_Closed+"</td><td class=text-center>"+FamilyType+"</td><td class=text-center>"+result[i].office_name+"</td><td class=text-center><p data-placement=\"top\" data-toggle=\"tooltip\" title=\"أختار\"> \
          <input value="+result[i].fid+" id=\"family_come_from_edit\" type=\"radio\" name=\"family_come_from\" class=\"radioBtn\"/> \
          </p></td></tr>");
      } 
    });
  });

  $("#Gender").change(function(){
    // 1 for male and 2 for female
    if($(this).val()==1){
      ///get_religion
      //#Religion_Id
      $('#Religion_Id').empty();
      $.get('/get_religion',function(result){ 
        for(i in result){
          $('#Religion_Id').append("<option value = '"+i+"'>"+result[i][0]+"</option>").selectpicker('refresh');
        }
      });
      $('#Socialstatus_Id').empty();
      $.get('/get_social',function(result){ 
        for(i in result){
          $('#Socialstatus_Id').append("<option value = '"+i+"'>"+result[i][0]+"</option>").selectpicker('refresh');
        }
      });
      $('#Nationality_Id').empty();
      //$('#Certification_Type_Id').empty();  
      $.get('/get_country',function(result){ 
        for(i in result){
          $('#Nationality_Id').append("<option value = '"+result[i].id+"'>"+result[i].nationality_male+"</option>").selectpicker('refresh');
        //  $('#Certification_Type_Id').append("<option value = '"+result[i].id+"'>"+result[i].nationality_male+"</option>").selectpicker('refresh');

        }
      });
    }

    if($(this).val()==2) {
      $('#Religion_Id').empty();
      $.get('/get_religion',function(result){ 
        for(i in result){
          $('#Religion_Id').append("<option value = '"+i+"'>"+result[i][1]+"</option>").selectpicker('refresh');
        }
      });
      $('#Socialstatus_Id').empty();
      $.get('/get_social',function(result){ 
        for(i in result){
          $('#Socialstatus_Id').append("<option value = '"+i+"'>"+result[i][1]+"</option>").selectpicker('refresh');
        }
      });
      $('#Nationality_Id').empty();
       $('#Certification_Type_Id').empty();  
      $.get('/get_country',function(result){ 
        for(i in result){
          $('#Nationality_Id').append("<option value = '"+result[i].id+"'>"+result[i].nationality_female+"</option>").selectpicker('refresh');
          $('#Certification_Type_Id').append("<option value = '"+result[i].id+"'>"+result[i].nationality_female+"</option>").selectpicker('refresh');
        }
      });
    }
  });
  
  $("#Gender_edit").change(function(){
    // 1 for male and 2 for female
    if($(this).val()==1){
      ///get_religion
      //#Religion_Id
      $('#Religion_Id_edit').empty();
      $.get('/get_religion',function(result){ 
        for(i in result){
          $('#Religion_Id_edit').append("<option value = '"+i+"'>"+result[i][0]+"</option>").selectpicker('refresh');
        }
      });
      $('#Socialstatus_Id_edit').empty();
      $.get('/get_social',function(result){ 
        for(i in result){
          $('#Socialstatus_Id_edit').append("<option value = '"+i+"'>"+result[i][0]+"</option>").selectpicker('refresh');
        }
      });
      $('#Nationality_Id_edit').empty();
      //$('#Certification_Type_Id_edit').empty();  
      $.get('/get_country',function(result){ 
        for(i in result){
          $('#Nationality_Id_edit').append("<option value = '"+result[i].id+"'>"+result[i].nationality_male+"</option>").selectpicker('refresh');
         // $('#Certification_Type_Id_edit').append("<option value = '"+result[i].id+"'>"+result[i].nationality_male+"</option>").selectpicker('refresh');

        }
      });
    }

    if($(this).val()==2) {
      $('#Religion_Id_edit').empty();
      $.get('/get_religion',function(result){ 
        for(i in result){
          $('#Religion_Id_edit').append("<option value = '"+i+"'>"+result[i][1]+"</option>").selectpicker('refresh');
        }
      });
      $('#Socialstatus_Id_edit').empty();
      $.get('/get_social',function(result){ 
        for(i in result){
          $('#Socialstatus_Id_edit').append("<option value = '"+i+"'>"+result[i][1]+"</option>").selectpicker('refresh');
        }
      });
      $('#Nationality_Id_edit').empty();
       //$('#Certification_Type_Id_edit').empty();  
      $.get('/get_country',function(result){ 
        for(i in result){
          $('#Nationality_Id_edit').append("<option value = '"+result[i].id+"'>"+result[i].nationality_female+"</option>").selectpicker('refresh');
         // $('#Certification_Type_Id_edit').append("<option value = '"+result[i].id+"'>"+result[i].nationality_female+"</option>").selectpicker('refresh');
        }
      });
    }
  });

  $('#add').on('hidden.bs.modal', function(){
    $(".box").hide();
    $(this).removeData('bs.modal');
    $('.selectpicker').selectpicker('val', null);
    $('#add_personal_form').validate().resetForm();
  });
   
  $('#edit').on('hidden.bs.modal', function(){
    $(".box").hide();
    $(this).removeData('bs.modal');
    $('.selectpicker').selectpicker('val', null);
    $('#edit_personal_form').validate().resetForm();
  });

  $('#Birth_Date, #Enlistingdate, #Certification_Issuance_Date').datetimepicker({
    useCurrent: false,
    viewMode: 'years',
    format: 'YYYY-MM-DD',
    locale: 'ar-sa'
  });

  $('#Birth_Date_edit, #Enlistingdate_edit, #Certification_Issuance_Date_edit').datetimepicker({
    useCurrent: false,
    viewMode: 'years',
    format: 'YYYY-MM-DD',
    locale: 'ar-sa'
  });
  
  /*----------- validate in add Family----------*/
  $("#add_personal_form").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    ignore:[],
    rules:{
      Arabic_Firstname:{
        required: true,
        arabicLettersWithSpacesOnly: true
      },
      Arabic_Fathername:{
        required: true,
        arabicLettersWithSpacesOnly: true
      },
      Arabic_Grandfathername:{
        required: true,
        arabicLettersWithSpacesOnly: true
      },
      Arabic_Familyname:{
        required: true,
        arabicLettersWithSpacesOnly: true
      },
      Gender:{
        required: true
      },
      country:{
        required: true
      },
      city_id:{
        required: true
      },
      Birth_Place:{
        required: true,
        arabicLettersWithSpacesOnly: true
      },
      Birth_Date:{
        required: true
      },
      Nationality_Id:{
        required: true
      },
      KinshipId:{
        required: true
      },
      Socialstatus_Id:{
        required: true
      },
      Religion_Id:{
        required: true
      },
      Enlistingdate:{
        required: true,
        greaterThan: "#Birth_Date"
      },
      Mothernationality_Id:{
        required: true
      },
      Fathernationality_Id:{
        required: true
      },
      JobId:{
        required: true
      },
      mother_status:{
        required: true
      },
      Regdoctype_Id:{
        required: true
      }
    },
    messages:{
      Arabic_Firstname:{
        required: "الرجاء ادخال الاسم!"
      },
      Arabic_Fathername:{
        required: "الرجاء ادخال اسم اﻷب!"
      },
      Arabic_Grandfathername:{
        required: "الرجاء ادخال اسم الجد!",
      },
      Arabic_Familyname:{
        required: "الرجاء ادخال لقب العائلة!",
      },
      Gender:{
        required: "الرجاء اختيار الجنس!"
      },
      country:{
        required: "الرجاء اختيار دولة الميلاد!"
      },
      city_id:{
        required: "الرجاء اختيار مدينة الميلاد!"
      },
      Birth_Place:{
        required: "الرجاء ادخال مجل الميلاد!"
      },
      Birth_Date:{
        required: "الرجاء ادخال تاريخ الميلاد!"
      },
      Nationality_Id:{
        required: "الرجاء اختيار الجنسية!"
      },
      KinshipId:{
        required: "الرجاء اختيار صلة القرابة!"
      },
      Socialstatus_Id:{
        required: "الرجاء اختيار الحالة الاجتماعية!"
      },
      Religion_Id:{
        required: "الرجاء اختيار الديانة!"
      },
      Enlistingdate:{
        required: "الرجاء ادخال تاريخ الاكتتاب!"
      },
      Mothernationality_Id:{
        required: "الرجاء اختيار جنسية اﻷم!"
      },
      Fathernationality_Id:{
        required: "الرجاء اختيار جنسية اﻷب!"
      },
      JobId:{
        required: "الرجاء اختيار المهنة!"
      },
      mother_status:{
        required: "الرجاء اختيار حالة اﻷم!"
      },
      Regdoctype_Id:{
        required: "الرجاء اختيار سند القيد!"
      }
    },
    errorClass: 'custom-error',
    errorPlacement: function (error, element) {
      if ($(element).is('select')) {
          element.next().after(error);
      } else {
          error.insertAfter(element);
      }
    },
    highlight: function(element) {
      $(element).closest('.row').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.row').removeClass('has-error');
    },
  });

  $("#edit_personal_form").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    ignore:[],
    rules:{
      Arabic_Firstname:{
        required: true,
        arabicLettersWithSpacesOnly: true
      },
      Arabic_Fathername:{
        required: true,
        arabicLettersWithSpacesOnly: true
      },
      Arabic_Grandfathername:{
        required: true,
        arabicLettersWithSpacesOnly: true
      },
      Arabic_Familyname:{
        required: true,
        arabicLettersWithSpacesOnly: true
      },
      Gender:{
        required: true
      },
      country:{
        required: true
      },
      city_id:{
        required: true
      },
      Birth_Place:{
        required: true,
        arabicLettersWithSpacesOnly: true
      },
      Birth_Date:{
        required: true
      },
      Nationality_Id:{
        required: true
      },
      KinshipId:{
        required: true
      },
      Socialstatus_Id:{
        required: true
      },
      Religion_Id:{
        required: true
      },
      Enlistingdate:{
        required: true,
        greaterThan: "#Birth_Date_edit"
      },
      Mothernationality_Id:{
        required: true
      },
      Fathernationality_Id:{
        required: true
      },
      JobId:{
        required: true
      },
      mother_status:{
        required: true
      },
      Regdoctype_Id:{
        required: true
      }
    },
    messages:{
      Arabic_Firstname:{
        required: "الرجاء ادخال الاسم!"
      },
      Arabic_Fathername:{
        required: "الرجاء ادخال اسم اﻷب!"
      },
      Arabic_Grandfathername:{
        required: "الرجاء ادخال اسم الجد!",
      },
      Arabic_Familyname:{
        required: "الرجاء ادخال لقب العائلة!",
      },
      Gender:{
        required: "الرجاء اختيار الجنس!"
      },
      country:{
        required: "الرجاء اختيار دولة الميلاد!"
      },
      city_id:{
        required: "الرجاء اختيار مدينة الميلاد!"
      },
      Birth_Place:{
        required: "الرجاء ادخال مجل الميلاد!"
      },
      Birth_Date:{
        required: "الرجاء ادخال تاريخ الميلاد!"
      },
      Nationality_Id:{
        required: "الرجاء اختيار الجنسية!"
      },
      KinshipId:{
        required: "الرجاء اختيار صلة القرابة!"
      },
      Socialstatus_Id:{
        required: "الرجاء اختيار الحالة الاجتماعية!"
      },
      Religion_Id:{
        required: "الرجاء اختيار الديانة!"
      },
      Enlistingdate:{
        required: "الرجاء ادخال تاريخ الاكتتاب!"
      },
      Mothernationality_Id:{
        required: "الرجاء اختيار جنسية اﻷم!"
      },
      Fathernationality_Id:{
        required: "الرجاء اختيار جنسية اﻷب!"
      },
      JobId:{
        required: "الرجاء اختيار المهنة!"
      },
      mother_status:{
        required: "الرجاء اختيار حالة اﻷم!"
      },
      Regdoctype_Id:{
        required: "الرجاء اختيار سند القيد!"
      }
    },
    errorClass: 'custom-error',
    errorPlacement: function (error, element) {
      if ($(element).is('select')) {
          element.next().after(error);
      } else {
          error.insertAfter(element);
      }
    },
    highlight: function(element) {
      $(element).closest('.row').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.row').removeClass('has-error');
    },
  });

  $("#Regdoctype_Id").change(function(){
    $(this).find("option:selected").each(function() {
      if($(this).attr("value")==2) {
        $(".box").show().addClass("animated fadeIn");
        $("#Certification_Type_Id").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء اختيار نوع الجنسية!</h6>",
          }
        });   
        $("#Certification_Issuance_Date").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء ادخال تاريخ الجنسية!</h6>",
          }
        });
        $("#Certification_File_Number").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء ادخال رقم الملف!</h6>",
          }
        });
        $("#CertificationMber").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء ادخال رقم الشهادة!</h6>",
          }
        });
      } else {
        $(".box").hide(300);
        $("#Certification_Type_Id").rules( 'remove', 'required' );
        $("#Certification_Issuance_Date").rules( 'remove', 'required' );
        $("#Certification_File_Number").rules( 'remove', 'required' );
        $("#CertificationMber").rules( 'remove', 'required' );
      }
    });
  }).change();

  $("#Regdoctype_Id_edit").change(function(){
    $(this).find("option:selected").each(function() {
      if($(this).attr("value")==2) {
        $(".box").show().addClass("animated fadeIn");
        $("#Certification_Type_Id_edit").rules("edit", {
          required: true,
          messages: {
            required: "<h6>الرجاء اختيار نوع الجنسية!</h6>",
          }
        });   
        $("#Certification_Issuance_Date_edit").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء ادخال تاريخ الجنسية!</h6>",
          }
        });
        $("#Certification_File_Number_edit").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء ادخال رقم الملف!</h6>",
          }
        });
        $("#CertificationMber_edit").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء ادخال رقم الشهادة!</h6>",
          }
        });
      } else {
        $(".box").hide(300);
        $("#Certification_Type_Id_edit").rules( 'remove', 'required' );
        $("#Certification_Issuance_Date_edit").rules( 'remove', 'required' );
        $("#Certification_File_Number_edit").rules( 'remove', 'required' );
        $("#CertificationMber_edit").rules( 'remove', 'required' );
      }
    });
  }).change();
  


  $("#mother_status").change(function(){
    $(this).find("option:selected").each(function() {
      if($(this).attr("value")==2) {
        $("#insert_mother_name").removeClass("hide");
        $("#select_mother_name").addClass("hide");
        $("#Arabic_Motherfirstname").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء ادخال اسم اﻷم!</h6>",
          }
        });
        $("#Arabic_Motherfathername").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء ادخال والد اﻷم!</h6>",
          }
        });   
        $("#Arabic_Mothergrandfathername").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء ادخال جد اﻷم!</h6>",
          }
        });
        $("#Arabic_Motherfamilyname").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء ادخال لقب اﻷم!</h6>",
          }
        });
        $("#Motherperson_Id").rules( 'remove', 'required' );
      } else if($(this).attr("value")==1) {
        $("#select_mother_name").removeClass("hide");
        $("#insert_mother_name").addClass("hide");
        $("#Motherperson_Id").rules("add", {
          required: true,
          messages: {
            required: "الرجاء اختيار اسم اﻷم!",
          }
        });
        $("#Arabic_Motherfirstname").rules( 'remove', 'required' );
        $("#Arabic_Motherfathername").rules( 'remove', 'required' );
        $("#Arabic_Mothergrandfathername").rules( 'remove', 'required' );
        $("#Arabic_Motherfamilyname").rules( 'remove', 'required' );
      }
    });
  }).change();


$("#mother_status_edit").change(function(){
    $(this).find("option:selected").each(function() {
      if($(this).attr("value")==2) {
        $("#insert_mother_name_edit").removeClass("hide");
        $("#select_mother_name_edit").addClass("hide");
        $("#Arabic_Motherfirstname_edit").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء ادخال اسم اﻷم!</h6>",
          }
        });
        $("#Arabic_Motherfathername_edit").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء ادخال والد اﻷم!</h6>",
          }
        });   
        $("#Arabic_Mothergrandfathername_edit").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء ادخال جد اﻷم!</h6>",
          }
        });
        $("#Arabic_Motherfamilyname_edit").rules("add", {
          required: true,
          messages: {
            required: "<h6>الرجاء ادخال لقب اﻷم!</h6>",
          }
        });
        $("#Motherperson_Id_edit").rules( 'remove', 'required' );
      } else if($(this).attr("value")==1) {
        $("#select_mother_name_edit").removeClass("hide");
        $("#insert_mother_name_edit").addClass("hide");
        $("#Motherperson_Id_edit").rules("add", {
          required: true,
          messages: {
            required: "الرجاء اختيار اسم اﻷم!",
          }
        });
        $("#Arabic_Motherfirstname_edit").rules( 'remove', 'required' );
        $("#Arabic_Motherfathername_edit").rules( 'remove', 'required' );
        $("#Arabic_Mothergrandfathername_edit").rules( 'remove', 'required' );
        $("#Arabic_Motherfamilyname_edit").rules( 'remove', 'required' );
      }
    });
  }).change();

  $('#add').on('hidden.bs.modal', function(){
    $(this).removeData('bs.modal');
    $('#add_personal_form').validate().resetForm();
  });

  $('#edit').on('hidden.bs.modal', function(){
    $(this).removeData('bs.modal');
    $('#edit_personal_form').validate().resetForm();
  });

  $('.selectpicker').selectpicker().change(function(){
    $(this).valid()
  });

  // $("#add_personal_form").on('submit', function () {
  //   var isValid = $(this).valid();
  //   if (this.hasChildNodes('.nav.nav-tabs')) {
  //     var validator = $(this).validate();
  //     $(this).find("input").each(function () {
  //       if (!validator.element(this)) {
  //         isValid = false;
  //         $('a[href=#' + $(this).closest('.tab-pane:not(.active)').attr('id') + ']').tab('show');
  //         return false;
  //       }
  //     });
  //   }
  //   if (isValid) {
  //     // do stuff
  //   }
  // });

});