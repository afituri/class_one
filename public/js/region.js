$(document).ready(function(){
  
  $("[data-toggle=tooltip]").tooltip();
  jQuery.validator.addMethod("arabicLettersOnly", function(value, element) {
    return this.optional(element) || /^[أ-ي,ﻻ,' ',ء]+$/i.test(value);
  }, "الرجاء ادخال حروف عربية فقط!");

  /*----------- validate in add Region----------*/
  $("#add_regin_form").validate({
    rules:{
      region_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      region_name:{
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

  /*----------- validate in edit Region----------*/
  $("#edit_regin_form").validate({
    rules:{
      region_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      region_name:{
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

  /*----------- validate in search Region----------*/
  $("#search_region").validate({
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

  /*----------- view in modal Region----------*/
  $('body').on('click', '.edit_btn', function(){
    var region_id = $(this).val(),
        region_name= $('#br-'+region_id).data('name');
    $('#edit_region_name').val(region_name);
    $('#region_id_edit').val(region_id);
  });

  /*----------- Delete in modal Region----------*/
  $('body').on('click', '.delete_btn', function(){
    var region_id = $(this).val();
    console.log($(this).val());
    $("#region_id_delete").val($(this).val());
  });
  if($getMsg["msg"]==1){
    custNotify("success","نجاح","تم حذف منطقة بنجاح","ok-sign","bounceInDown","bounceOutUp");
    replaceUrl('/region');    
  } else if ($getMsg["msg"]==2) {
    custNotify("danger","خطأ","لا يمكن حذف هذه المنطقة لاعتماد كيانات اخرى عليها","ok-sign","bounceIn","bounceOut");
    replaceUrl('/region');
  }


});