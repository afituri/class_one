$(document).ready(function(){
  
  $("[data-toggle=tooltip]").tooltip();
  $("[name='family_type']").bootstrapSwitch();

  jQuery.validator.addMethod("arabicLettersOnly", function(value, element) {
    return this.optional(element) || /^[أ-ي,ﻻ,' ',ء]+$/i.test(value);
  }, "الرجاء ادخال حروف عربية فقط!");

  /*----------- validate in add Family----------*/
  $("#add_family_form").validate({
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

  /*----------- validate in edit Family----------*/
  $("#edit_family_form").validate({
    rules:{
      family_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      family_name:{
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
  $("#search_family").validate({
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

  /*----------- view in modal Family----------*/
  $('body').on('click', '.edit_btn', function(){
    var family_id = $(this).val(),
        registry_number= $('#br-'+family_id).data('registry_number');
        record_number= $('#br-'+family_id).data('record_number');
        family_record_date= $('#br-'+family_id).data('family_record_date');
        auto_generated_id= $('#br-'+family_id).data('auto_generated_id');
        is_closed= $('#br-'+family_id).data('is_closed');
        family_office= $('#br-'+family_id).data('officee');
        family_type= $('#br-'+family_id).data('family_type');
        office_name= $('#br-'+family_id).data('office_name');
        $('#FamilyTypeEdit').selectpicker('val',family_type);
        $('#edit_family_office').selectpicker('val',family_office);
        $('#edit_registry_number').val(registry_number);
        $('#edit_record_number').val(record_number);
        $('#edit_family_record_date').val(family_record_date);
        $('#edit_auto_generated_id').val(auto_generated_id);
    //$('#edit_is_closed').val(is_closed);
    $('#edit_is_closed').selectpicker('val',is_closed);
    $('#family_id_edit').val(family_id);
  });

  /*----------- Delete in modal Family----------*/
  $('body').on('click', '.delete_btn', function(){
    var manucipality_id = $(this).val();
    console.log($(this).val());
    $("#family_id_delete").val($(this).val());
  });
  if($getMsg["msg"]==1){
    custNotify("success","نجاح","تم حذف منطقة بنجاح","ok-sign","bounceInDown","bounceOutUp");
    replaceUrl('/family');    
  } else if ($getMsg["msg"]==2) {
    custNotify("danger","خطأ","لا يمكن حذف هذه المنطقة لاعتماد كيانات اخرى عليها","warning-sign","bounceIn","bounceOut");
    replaceUrl('/family');
  }


});