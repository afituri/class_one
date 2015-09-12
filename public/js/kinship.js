$(document).ready(function(){
  
  $("[data-toggle=tooltip]").tooltip();

  jQuery.validator.addMethod("arabicLettersOnly", function(value, element) {
    return this.optional(element) || /^[أ-ي,ﻻ,' ',ء]+$/i.test(value);
  }, "الرجاء ادخال حروف عربية فقط!");

  /*----------- validate in add Kinship----------*/
  $("#add_kinship_form").validate({
    rules:{
      kinship_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      kinship_name:{
        required: "الرجاء ادخال اسم صلة القرابة!",
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

  /*----------- validate in edit Kinship----------*/
  $("#edit_kinship_form").validate({
    rules:{
      kinship_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      kinship_name:{
        required: "الرجاء ادخال اسم صلة القرابة!",
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
  $("#search_kinship").validate({
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

 /*----------- view in modal Kinship----------*/
  $('body').on('click', '.edit_btn', function(){
    var kinship_id = $(this).val(),
        kinship_name= $('#br-'+kinship_id).data('name');
    $('#edit_kinship_name').val(kinship_name);
    $('#kinship_id_edit').val(kinship_id);
  });

  /*----------- Delete in modal Kinship----------*/
  $('body').on('click', '.delete_btn', function(){
    var kinship_id = $(this).val();
    console.log($(this).val());
    $("#kinship_id_delete").val($(this).val());
  });
  if($getMsg["msg"]==1){
    custNotify("success","نجاح","تم حذف منطقة بنجاح","ok-sign","bounceInDown","bounceOutUp");
    replaceUrl('/kinship');    
  } else if ($getMsg["msg"]==2) {
    custNotify("danger","خطأ","لا يمكن حذف هذه المنطقة لاعتماد كيانات اخرى عليها","ok-sign","bounceIn","bounceOut");
    replaceUrl('/kinship');
  }

});