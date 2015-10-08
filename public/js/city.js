$(document).ready(function(){
  
  $("[data-toggle=tooltip]").tooltip();

  jQuery.validator.addMethod("arabicLettersOnly", function(value, element) {
    return this.optional(element) || /^[أ-ي,ﻻ,' ',ء]+$/i.test(value);
  }, "الرجاء ادخال حروف عربية فقط!");

  /*----------- validate in add city----------*/
  $("#add_city_form").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      CountryId:{
        required: true
      },
      city_name:{
        required: true,
        arabicLettersOnly: true
      },
    },
    messages:{
      CountryId:{
        required: "الرجاء اختيار الدولة !"
      },
      city_name:{
        required: "الرجاء ادخال اسم المنطقة!",
        arabicLettersOnly: "الرجاء ادخال حروف عربية فقط!",
      },
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

  /*----------- validate in edit city----------*/
  $("#edit_city_form").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      city_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      city_name:{
        required: "الرجاء ادخال اسم بلد الميلاد!",
        arabicLettersOnly: "الرجاء ادخال حروف عربية فقط!",
      },
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
      $(element).closest('.row').addClass('has-error').removeClass('has-success');
    },
    unhighlight: function(element) {
      $(element).closest('.row').removeClass('has-error').addClass('has-success');
    },
  });

  /*----------- validate in search city----------*/
  $("#search_city").validate({
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
  
  /*----------- Load data in modal city----------*/
  $('body').on('click', '.edit_btn',  function(){
    var city_id = $(this).val(),
        city_name= $('#br-'+city_id).data('name');
        city_country= $('#br-'+city_id).data('country_id');
        console.log(city_country);
    $('#edit_city_country').selectpicker('val',city_country);
    $('#edit_city_name').val(city_name);
    $('#city_id_edit').val(city_id);
  });

  /*----------- Delete in modal city----------*/
  $('body').on('click', '.delete_btn', function(){
    var city_id = $(this).val();
    console.log($(this).val());
    $("#city_id_delete").val($(this).val());
  });
  if($getMsg["msg"]==1){
    custNotify("success","نجاح","تم حذف مدينة الميلاد بنجاح","ok-sign","bounceInDown","bounceOutUp");
    replaceUrl('/city');    
  } else if ($getMsg["msg"]==2) {
    custNotify("danger","خطأ","لا يمكن حذف مدينة الميلاد هذه لاعتماد كيانات اخرى عليها","warning-sign","bounceIn","bounceOut");
    replaceUrl('/city');
  }
  
});
