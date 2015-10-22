$(document).ready(function(){

  // insert data 
 /* $('body').on('click', '#save', function (e) {
    e.preventDefault();
    $('#formDepartment').submit();
  });

  $("#formDepartment").submit(function(e) {
    var isvalidate=$("#formDepartment").valid();
    if(isvalidate){
      $.post("/department/updateDepartment", $("form").serializeObject(), function(data, error){
        if(data.stat !=true){
        } */

  
  $('body').on('click', '#remove', function(e){
    $('#delete_it').val($(this).val());
  });

  $('body').on('click', '#delete_it', function(e){
    //alert($(this).val());
    var path=document.URL;
    var familyid=path.split('/').pop();
    $.get('/delete_personal/'+$(this).val(),function(result){ 
         if(result){
 
           window.location.href='/personal/'+familyid; 
           custNotify("success","نجاح","تم حذف السجل المدني بنجاح","ok-sign","bounceInDown","bounceOutUp");
         }
    });
  });

 var get_famly_fromId;
  $('body').on('click', '#family_come_from', function(e){
    if($("input[type='radio'].radioBtnClass").is(':checked')) {
    get_famly_fromId= $("input[type='radio'].radioBtnClass:checked").val();
    }
  });

  //#kinship
   $('body').on('change', '#kinship', function(e){
    var path=document.URL;
    var familyid=path.split('/').pop();
    $('#Motherperson_Id').empty();
    if($(this).val()==3){
      $('#Motherperson_Id').append('<option value="">اختر اسم اﻷم بالكامل </option>').selectpicker('refresh');
       $.get('/get_Personal_in_family/'+familyid,function(result){
        for(i in result){
          if(result[i].KinshipId==2){ 
            $('#three').hide();
            $('#Motherperson_Id').append('<option value='+result[i].id+'  > '+result[i].Arabic_Firstname+' '+result[i].Arabic_Fathername+' '+result[i].Arabic_Grandfathername+' '+result[i].Arabic_Familyname+' </option>').selectpicker('refresh');;
          } 
        }
       });
    } else { 
      $('#three').show();
    }
   });



 


  $('body').on('click', '#add_personal_btn', function(e){
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
        city_id : $('#city_id').val(),
        KinshipId: $('#kinship').val(),
        Mothernationality_Id : $('#Mothernationality_Id').val(),
        Fathernationality_Id : $('#Fathernationality_Id ').val(),
        JobId : $('JobId').val(),
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
    }
    $.post('/insert_personal',obj,function(result){ 
      alert(result);
        window.location.href='/personal/'+familyid;
    });
  });

  $("[name='family_type'],[name='Is_Alive']").bootstrapSwitch();

  $("#Regdoctype_Id").change(function(){
    $(this).find("option:selected").each(function() {
      if($(this).attr("value")==2) {
        $(".box").show().addClass("animated fadeIn");
      } else {
        $(".box").hide(300);
      }
    });
  }).change();

  $("#mother_status").change(function(){
    $(this).find("option:selected").each(function() {
      if($(this).attr("value")==2) {
        $(".insert_mother_name").removeClass("hide").addClass("animated fadeIn");
        $(".select_mother_name").addClass("hide");
      } else if($(this).attr("value")==1) {
        $(".select_mother_name").removeClass("hide").addClass("animated fadeIn");
        $(".insert_mother_name").addClass("hide");
      }
    });
  }).change();

  $("#father_status").change(function(){
    $(this).find("option:selected").each(function() {
      if($(this).attr("value")==2) {
        $(".insert_father_name").removeClass("hide").addClass("animated fadeIn");
        $(".select_father_name").addClass("hide");
      } else if($(this).attr("value")==1) {
        $(".select_father_name").removeClass("hide").addClass("animated fadeIn");
        $(".insert_father_name").addClass("hide");
      }
    });
  }).change();

  $("#country").change(function(){
    $('#city_id').empty();
    
    $.get('/personal/get_city/'+$(this).val(),function(result){ 
      for(i in result){
        var x=result[i].id;
        $('#city_id').append("<option value ='"+x+"'>"+result[i].city_name+"</option>").selectpicker('refresh');
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
      $('#Certification_Type_Id').empty();  
      $.get('/get_country',function(result){ 
        for(i in result){
          $('#Nationality_Id').append("<option value = '"+result[i].id+"'>"+result[i].nationality_male+"</option>").selectpicker('refresh');
          $('#Certification_Type_Id').append("<option value = '"+result[i].id+"'>"+result[i].nationality_male+"</option>").selectpicker('refresh');

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

  $('#add').on('hidden.bs.modal', function(){
    $(".box").hide();
    $(this).removeData('bs.modal');
    $('.selectpicker').selectpicker('val', null);
    $('#add_personal_form').validate().resetForm();
  });

  $('#Birth_Date, #Enlistingdate, #Certification_Issuance_Date').datetimepicker({
    useCurrent: false,
    viewMode: 'years',
    format: 'YYYY-MM-DD',
    locale: 'ar-sa'
  });
});