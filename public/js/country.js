$(document).ready(function(){
  $("[data-toggle=tooltip]").tooltip();

  jQuery.validator.addMethod("arabicLettersOnly", function(value, element) {
    return this.optional(element) || /^[أ-ي,ﻻ,ء]+$/i.test(value);
  }, "الرجاء ادخال حروف عربية فقط!");

  $("#add_country_form").validate({
    rules:{
      country_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      country_name:{
        required: "الرجاء ادخال اسم بلد الميلاد صحيح!",
        arabicLettersOnly: "الرجاء ادخال حروف عربية فقط!",
      },
    },
    
    // errorClass: 'custom-error',
    highlight: function(element) {
      $(element).closest('.row').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.row').removeClass('has-error');
    },
  });

  $("#edit_country_form").validate({
    rules:{
      country_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      country_name:{
        required: "الرجاء ادخال اسم بلد الميلاد صحيح!",
        arabicLettersOnly: "الرجاء ادخال حروف عربية فقط!",
      },
    },
    // errorClass: 'custom-error',
    highlight: function(element) {
      $(element).closest('.row').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.row').removeClass('has-error');
    },
  });

});