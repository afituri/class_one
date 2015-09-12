$(document).ready(function(){
  
  $("[data-toggle=tooltip]").tooltip();

  jQuery.validator.addMethod("arabicLettersOnly", function(value, element) {
    return this.optional(element) || /^[أ-ي,ﻻ,' ',ء]+$/i.test(value);
  }, "الرجاء ادخال حروف عربية فقط!");

  /*----------- validate in add Branch----------*/
  $("#add_branch_form").validate({
    rules:{
      branch_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      branch_name:{
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

  /*----------- validate in edit Branch----------*/
  $("#edit_branch_form").validate({
    rules:{
      branch_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      branch_name:{
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

  /*----------- validate in search Branch----------*/
  $("#search_branch").validate({
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
  
  /*----------- Load data in modal Branch----------*/
  $('body').on('click', '.edit_btn',  function(){
    var branch_id = $(this).val(),
        branch_name= $('#br-'+branch_id).data('name');
        branch_region= $('#br-'+branch_id).data('region_id');
        console.log(branch_region);
    $('#edit_branch_region').selectpicker('val',branch_region);
    $('#edit_branch_name').val(branch_name);
    $('#branch_id_edit').val(branch_id);
  });

  /*----------- Delete in modal Branch----------*/
  $('body').on('click', '.delete_btn', function(){
    var branch_id = $(this).val();
    console.log($(this).val());
    $("#branch_id_delete").val($(this).val());
  });
  if($getMsg["msg"]==1){
    custNotify("success","نجاح","تم حذف مكتب الاصدار بنجاح","ok-sign","bounceInDown","bounceOutUp");
    replaceUrl('/branch');    
  } else if ($getMsg["msg"]==2) {
    custNotify("danger","خطأ","لا يمكن حذف مكتب الاصدار اذه لاعتماد كيانات اخرى عليها","ok-sign","bounceIn","bounceOut");
    replaceUrl('/branch');
  }
  
});
