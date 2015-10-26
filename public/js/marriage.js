$(document).ready(function(){
  ///////////////////////// search marriage Family /////////////////////////
  $('body').on('click', '#search', function (e) {
    e.preventDefault();
    $('#search_marriage').submit();
  });

  $('body').on('click', '#search_F', function (e) {
    e.preventDefault();
    $('#search_marriage_F').submit();
  });

  $("#search_marriage_F").submit(function(e) {
    var isvalidate=$("#search_marriage_F").valid();
    if(isvalidate){
    $.post("/searchMarriage", $("#search_marriage_F").serializeObject(), function(data, error){
        if(data.stat !=true){
          alert("no");
        } 
        else {
         $("#tbody_F").empty();
         for (var i = 0; i < data.result.length; i++) {
          date = new Date(data.result[i].Personal.Birth_Date);
          var day = date.getDate();
          var monthIndex = date.getMonth();
          var year = date.getFullYear();
          $("#tbody_F").append('<tr>'+
            '<td class="text-center">'+data.result[i].Personal.Arabic_Familyname+' '+data.result[i].Personal.Arabic_Grandfathername+' '+data.result[i].Personal.Arabic_Fathername+' '+data.result[i].Personal.Arabic_Firstname+'</td>'+
            '<td class="text-center">'+year+"-"+monthIndex+"-"+day+'</td>'+
            '<td class="text-center">'+data.result[i].Kinship.kinship_name+'</td>'+
            '<td class="text-center">'+
            '<p data-placement="top", data-toggle="tooltip", title="تحديد">'+
            '<input id='+"mariage"+data.result[i].PersonalId+' name="Familid" type="hidden" value="'+data.result[i].FamilyId+'"></input>'+
            '<input class="radioBtnClass" type="radio" value="'+data.result[i].PersonalId+'"  name="radio_F"></input></p></td>');
         };
        }
      });
    }
    return false
});

  $("#search_marriage").submit(function(e) {
    var isvalidate=$("#search_marriage").valid();
    if(isvalidate){
      $.post("/searchMarriage", $("#search_marriage").serializeObject(), function(data, error){
        if(data.stat !=true){
          alert("no");
        } 
        else {
         $("#tbody").empty();
         for (var i = 0; i < data.result.length; i++) {
          date = new Date(data.result[i].Personal.Birth_Date);
          var day = date.getDate();
          var monthIndex = date.getMonth()+1;
          var year = date.getFullYear();
          $("#tbody").append('<tr>'+
            '<td class="text-center">'+data.result[i].Personal.Arabic_Familyname+' '+data.result[i].Personal.Arabic_Grandfathername+' '+data.result[i].Personal.Arabic_Fathername+' '+data.result[i].Personal.Arabic_Firstname+'</td>'+
            '<td class="text-center">'+year+"-"+monthIndex+"-"+day+'</td>'+
            '<td class="text-center">'+data.result[i].Kinship.kinship_name+'</td>'+
            '<td class="text-center" >'+
            '<p data-placement="top", data-toggle="tooltip", title="تحديد">'+
            '<input id='+"mariag"+data.result[i].PersonalId+' name="Familidm" type="hidden" value="'+data.result[i].FamilyId+'"></input>'+
            '<input id='+"Social"+data.result[i].PersonalId+' name="Socialstatus" type="hidden" value="'+data.result[i].Personal.Socialstatus_Id+'"></input>'+
            '<input id='+"Recordnumber"+data.result[i].PersonalId+' name="Recordnumber" type="hidden" value="'+data.result[i].Family.Recordnumber+'"></input>'+
            '<input id='+"FamilyRecordDate"+data.result[i].PersonalId+' name="FamilyRecordDate" type="hidden" value="'+data.result[i].Family.FamilyRecordDate+'"></input>'+
            '<input id='+"Registrynumber"+data.result[i].PersonalId+' name="Registrynumber" type="hidden" value="'+data.result[i].Family.Registrynumber+'"></input>'+
            '<input id='+"maria"+data.result[i].PersonalId+' name="OfficeId" type="hidden" value="'+data.result[i].Family.OfficeId+'"></input>'+
            '<input class="radioBtn" id="mariag" type="radio" value="'+data.result[i].PersonalId+'", name="radio_M"></input></p></td>');
         };

        }
      });
    }
    return false

    });
//////////////////////add new marriage //////////////////
 $('.add_marriage').on('click',function(){
   if($("input[type='radio'].radioBtn").is(':checked')) {
    var card_type = $("input[type='radio'].radioBtn:checked").val();
    }
    if($("input[type='radio'].radioBtnClass").is(':checked')) {
    var card_typee = $("input[type='radio'].radioBtnClass:checked").val();
    }
    if($("#tbody #Social"+card_type).val() == 2)
    {   date = new Date($("#tbody #FamilyRecordDate"+card_type).val());
          var day = date.getDate();
          var monthIndex = date.getMonth()+1;
          var year = date.getFullYear();
          $('#Recordnumber').val($("#tbody #mariag"+card_type).val()).prop( "disabled", true );
          $('#FamilyRecordDate').val(year+"-"+monthIndex+"-"+day).prop( "disabled", true );
          $('#Registrynumber').val($("#tbody #Registrynumber"+card_type).val()).prop( "disabled", true );
    }

    $('#husband_personal_Id').val(card_type);
    $('#husband_family_Id').val($("#tbody #mariag"+card_type).val());
    $('#wife_personal_Id').val(card_typee);
    $('#wife_family_Id').val($("#tbody_F #mariage"+card_typee).val());
    $('#OfficeId').val($("#tbody #maria"+card_type).val());
    $('#Socialstatus_Id').val($("#tbody #Social"+card_type).val());
  });

 $('body').on('click', '#save_Marriage', function (e) {
    e.preventDefault();
    $('#new_marriage').submit();
  });

 $("#new_marriage").submit(function(e) {
     var isvalidate=$("#new_marriage").valid();
    if(isvalidate){
      $.post("/add_new_marriage", $("#new_marriage").serializeObject(), function(data, error){
        if(data){
        window.location.href ="/marriage?msg=22";
        } else {
        window.location.href ="/marriage?msg=33";
        }
      });
    }
    return false
  });
 ///////////////// edit marriage //////////////////////////////
 $('.edit_btn').on('click',function(){
    var myDataAttr = $(this).val();
      $('#marriage_date').val($('[data-id = "'+myDataAttr+'"]').data('marriage_date'));
      $('#marriage_place').val($('[data-id = "'+myDataAttr+'"]').data('marriage_place'));
      $('#contract_number').val($('[data-id = "'+myDataAttr+'"]').data('contract_number'));
      $('#record_marriage_nu').val($('[data-id = "'+myDataAttr+'"]').data('record_marriage_nu'));
      $('#inform_date').val($('[data-id = "'+myDataAttr+'"]').data('inform_date'));
      $('#Recordnumber').val($('[data-id = "'+myDataAttr+'"]').data('recordnumber'));
      $('#Registrynumber').val($('[data-id = "'+myDataAttr+'"]').data('registrynumber'));
      $('#FamilyRecordDate').val($('[data-id = "'+myDataAttr+'"]').data('familyrecorddate'));
      $('#marriage_type').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('marriage_type'));
      $('#CityId').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('CityId'));
      $('#id').val($('[data-id = "'+myDataAttr+'"]').data('id'));
  });

 $('#update_Marriage').on('click',function(){
  var isvalidate=$("#edit_marriage").valid();
    if(isvalidate){
      $.post("/update_marriage", $("#edit_marriage").serializeObject(), function(data, error){
        if(data){
        window.location.href ="/marriage/marriages?msg=4";
        } else {
        window.location.href ="/marriage/marriages?msg=5";
        }
      });
    }
    return false;
 });
//////////////////////// delete marriage//////////////////////////////
 $('body').on('click','.delete_btn', function(){
    var id = $(this).val();
    $('#delete_marriage').val(id);
  });


if($getMsg["msg"]==1){
  custNotify("success","نجاح","تم حذف العائلة بنجاح","ok-sign","bounceInDown","bounceOutUp");
  replaceUrl('/marriage');    
} else if ($getMsg["msg"]==2) {
  custNotify("danger","خطأ","لا يمكن حذف هذه العائ لاعتماد كيانات اخرى عليها","warning-sign","bounceIn","bounceOut");
  replaceUrl('/marriage');
} else if ($getMsg["msg"]==11) {
  custNotify("success","نجاح","لقد قمت بتعديل الحقول بنجاح","ok-sign","bounceInDown","bounceOut");
  replaceUrl('/marriage');
} else if ($getMsg["msg"]==22) {
  $('#add').modal('hide');
  custNotify("success","نجاح","لقد قمت باضافة واقة بنجاح","ok-sign","bounceInDown","bounceOut");
  replaceUrl('/marriage');
} else if ($getMsg["msg"]==33) {
   $('#add').modal('hide');
  custNotify("danger","خطأ","الرجاء تعبئة جميع البيانات بالطريقة الصحيحة","warning-sign","bounceIn","bounceOut");
  replaceUrl('/marriage');
} else if ($getMsg["msg"]==4) {
  $('#add').modal('hide');
  custNotify("success","نجاح","لقد قمت بتعديل الواقعة بنجاح","ok-sign","bounceInDown","bounceOut");
  replaceUrl('/marriage/marriages');
} else if ($getMsg["msg"]==5) {
  $('#add').modal('hide');
  custNotify("danger","خطأ","الرجاء تعبئة جميع البيانات بالطريقة الصحيحة","warning-sign","bounceIn","bounceOut");
  replaceUrl('/marriage/marriages');
} 
});