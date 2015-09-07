$(document).ready(function(){
  $("[data-toggle=tooltip]").tooltip();

  jQuery.validator.addMethod("arabicLettersOnly", function(value, element) {
    return this.optional(element) || /^[أ-ي,ﻻ,ء]+$/i.test(value);
  }, "الرجاء ادخال حروف عربية فقط!");

  $("#add_job_form").validate({
    rules:{
      job_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      job_name:{
        required: "الرجاء ادخال اسم المهنة!",
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

  $("#edit_job_form").validate({
    rules:{
      job_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      job_name:{
        required: "الرجاء ادخال اسم المهنة!",
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