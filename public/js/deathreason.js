$(document).ready(function(){
  
  $("[data-toggle=tooltip]").tooltip();

  jQuery.validator.addMethod("arabicLettersOnly", function(value, element) {
    return this.optional(element) || /^[أ-ي,ﻻ,' ',ء]+$/i.test(value);
  }, "الرجاء ادخال حروف عربية فقط!");

  /*----------- validate in add deathreason----------*/
  $("#add_deathreason_form").validate({
    rules:{
      deathreason_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      deathreason_name:{
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

  /*----------- validate in edit deathreason----------*/
  $("#edit_deathreason_form").validate({
    rules:{
      deathreason_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      deathreason_name:{
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
  $("#search_deathreason").validate({
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

 /*----------- view in modal deathreason----------*/
  $('body').on('click', '.edit_btn', function(){
    var deathreason_id = $(this).val(),
        deathreason_name= $('#br-'+deathreason_id).data('name');
    $('#edit_deathreason_name').val(deathreason_name);
    $('#deathreason_id_edit').val(deathreason_id);
  });

  /*----------- Delete in modal deathreason----------*/
  $('body').on('click', '.delete_btn', function(){
    var deathreason_id = $(this).val();
    console.log($(this).val());
    $("#deathreason_id_delete").val($(this).val());
  });
  if ($getMsg["msg"]==1){
    custNotify("success","نجاح","تم حذف سبب الوفاة بنجاح","ok-sign","bounceInDown","bounceOutUp");
    replaceUrl('/deathreason');    
  } else if ($getMsg["msg"]==2) {
    custNotify("danger","خطأ","لا يمكن حذف هذه سبب الوفاة لاعتماد كيانات اخرى عليها","warning-sign","bounceIn","bounceOut");
    replaceUrl('/deathreason');
  } else if ($getMsg["msg"]==3) {
    custNotify("success","نجاح","تم إضافة سبب وفاة جديدة بنجاح","ok-sign","bounceIn","bounceOut");
    replaceUrl('/deathreason');
  } else if ($getMsg["msg"]==4) {
    custNotify("success","نجاح","تم تعديل سبب الوفاة بنجاح","warning-sign","bounceIn","bounceOut");
    replaceUrl('/deathreason');
  }



});