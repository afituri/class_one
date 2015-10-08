$(document).ready(function(){
  
  $("[data-toggle=tooltip]").tooltip();

  jQuery.validator.addMethod("arabicLettersOnly", function(value, element) {
    return this.optional(element) || /^[أ-ي,ﻻ,' ',ء]+$/i.test(value);
  }, "الرجاء ادخال حروف عربية فقط!");

  /*----------- validate in add Manucipality----------*/
  $("#add_manucipality_form").validate({
    rules:{
      manucipality_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      manucipality_name:{
        required: "الرجاء ادخال اسم المنطقة!",
        arabicLettersOnly: "الرجاء ادخال حروف عربية فقط!",
      },
    },
    highlight: function(element) {
      $(element).closest('.row').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.row').removeClass('has-error');
    },
  });

  /*----------- validate in edit Manucipality----------*/
  $("#edit_manucipality_form").validate({
    rules:{
      manucipality_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      manucipality_name:{
        required: "الرجاء ادخال اسم المنطقة!",
        arabicLettersOnly: "الرجاء ادخال حروف عربية فقط!",
      },
    },
    highlight: function(element) {
      $(element).closest('.row').addClass('has-error').removeClass('has-success');
    },
    unhighlight: function(element) {
      $(element).closest('.row').removeClass('has-error').addClass('has-success');
    },
  });

  /*----------- validate in edit search----------*/
  $("#search_manucipality").validate({
    rules:{
      search_name:{
        required: true,
      },
    },
    messages:{
      search_name:{
        required: "",
      },
    },
    highlight: function(element) {
      $(element).closest('.input-group').addClass('has-error').removeClass('has-success');
    },
    unhighlight: function(element) {
      $(element).closest('.input-group').removeClass('has-error').addClass('has-success');
    },
    invalidHandler: function(event, validator) {
      var errors = validator.numberOfInvalids();
      if (errors) {
        custNotify("danger","خطأ","الرجاء ادخال كلمة البحث","ok-sign","bounceIn","bounceOut");
      }
    },
  });

  /*----------- view in modal Manucipality----------*/
  $('body').on('click', '.edit_btn', function(){
    var manucipality_id = $(this).val(),
        manucipality_name= $('#br-'+manucipality_id).data('name');
    $('#edit_manucipality_name').val(manucipality_name);
    $('#manucipality_id_edit').val(manucipality_id);
  });

  /*----------- Delete in modal Manucipality----------*/
  $('body').on('click', '.delete_btn', function(){
    var manucipality_id = $(this).val();
    console.log($(this).val());
    $("#manucipality_id_delete").val($(this).val());
  });
  if ($getMsg["msg"]==1){
    custNotify("success","نجاح","تم حذف البلدية بنجاح","ok-sign","bounceInDown","bounceOutUp");
    replaceUrl('/manucipality');    
  } else if ($getMsg["msg"]==2) {
    custNotify("danger","خطأ","لا يمكن حذف هذه البلدية لاعتماد كيانات اخرى عليها","warning-sign","bounceIn","bounceOut");
    replaceUrl('/manucipality');
  } else if ($getMsg["msg"]==3){
    custNotify("success","نجاح","تمت إضافة بلدية جديدة بنجاح","ok-sign","bounceInDown","bounceOutUp");
    replaceUrl('/manucipality');    
  } else if ($getMsg["msg"]==4) {
    custNotify("success","نجاح","تم تعديل البلدية بنجاح","ok-sign","bounceInDown","bounceOutUp");
    replaceUrl('/manucipality');
  }


});