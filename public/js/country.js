$(document).ready(function(){
  
  $("[data-toggle=tooltip]").tooltip();
  jQuery.validator.addMethod("arabicLettersOnly", function(value, element) {
    return this.optional(element) || /^[أ-ي,ﻻ,' ',ء]+$/i.test(value);
  }, "الرجاء ادخال حروف عربية فقط!");

  /*----------- validate in add country----------*/
  $("#add_country_form").validate({
    rules:{
      country_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      country_name:{
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

  /*----------- validate in edit country----------*/
  $("#edit_country_form").validate({
    rules:{
      country_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      country_name:{
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
  $("#search_country").validate({
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

 /*----------- view in modal country----------*/
  $('body').on('click', '.edit_btn', function(){
    var country_id = $(this).val(),
        country_name= $('#br-'+country_id).data('name');
        nationality_male= $('#br-'+country_id).data('nationality_male');
        nationality_female= $('#br-'+country_id).data('nationality_female');
    $('#edit_country_name').val(country_name);
    $('#edit_nationality_male').val(nationality_male);
    $('#edit_nationality_female').val(nationality_female); 
    $('#country_id_edit').val(country_id);
  });

  /*----------- Delete in modal country----------*/
  $('body').on('click', '.delete_btn', function(){
    var country_id = $(this).val();
    console.log($(this).val());
    $("#country_id_delete").val($(this).val());
  });
  if($getMsg["msg"]==1){
    custNotify("success","نجاح","تم حذف بلد الميلاد بنجاح","ok-sign","bounceInDown","bounceOutUp");
    replaceUrl('/country');    
  } else if ($getMsg["msg"]==2) {
    custNotify("danger","خطأ","لا يمكن حذف هذه بلد الميلاد لاعتماد كيانات اخرى عليها","warning-sign","bounceIn","bounceOut");
    replaceUrl('/country');
  }


});
