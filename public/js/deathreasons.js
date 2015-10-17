$(document).ready(function(){
  
  $("[data-toggle=tooltip]").tooltip();

  jQuery.validator.addMethod("arabicLettersOnly", function(value, element) {
    return this.optional(element) || /^[أ-ي,ﻻ,' ',ء]+$/i.test(value);
  }, "الرجاء ادخال حروف عربية فقط!");

  /*----------- validate in add deathreasons----------*/
  $("#add_deathreasons_form").validate({
    rules:{
      deathreasons_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      deathreasons_name:{
        required: "الرجاء ادخال اسم سبب الوفاة!",
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

  /*----------- validate in edit deathreasons----------*/
  $("#edit_deathreasons_form").validate({
    rules:{
      deathreasons_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      deathreasons_name:{
        required: "الرجاء ادخال اسم سبب الوفاة!",
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
  $("#search_deathreasons").validate({
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

 /*----------- view in modal deathreasons----------*/
  $('body').on('click', '.edit_btn', function(){
    var deathreasons_id = $(this).val(),
        deathreasons_name= $('#br-'+deathreasons_id).data('name');
    $('#edit_deathreasons_name').val(deathreasons_name);
    $('#deathreasons_id_edit').val(deathreasons_id);
  });

  /*----------- Delete in modal deathreasons----------*/
  $('body').on('click', '.delete_btn', function(){
    var deathreasons_id = $(this).val();
    console.log($(this).val());
    $("#deathreasons_id_delete").val($(this).val());
  });
  if ($getMsg["msg"]==1){
    custNotify("success","نجاح","تم حذف سبب الوفاة بنجاح","ok-sign","bounceInDown","bounceOutUp");
    replaceUrl('/deathreasons');    
  } else if ($getMsg["msg"]==2) {
    custNotify("danger","خطأ","لا يمكن حذف سبب الوفاة اذه لاعتماد كيانات اخرى عليها","warning-sign","bounceIn","bounceOut");
    replaceUrl('/deathreasons');
  } else if ($getMsg["msg"]==3){
    custNotify("success","نجاح","تم اضافة سبب وفاة جديد بنجاج","ok-sign","bounceInDown","bounceOutUp");
    replaceUrl('/deathreasons');    
  } else if ($getMsg["msg"]==4) {
    custNotify("success","نجاح","تم تعديل سبب وفاة بنجاح","ok-sign","bounceInDown","bounceOutUp");
    replaceUrl('/deathreasons');
  }

});