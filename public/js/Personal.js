$(document).ready(function(){
  $("[data-toggle=tooltip]").tooltip();

  jQuery.validator.addMethod("arabicLettersOnly", function(value, element) {
    return this.optional(element) || /^[أ-ي,ﻻ,' ',ء]+$/i.test(value);
  }, "الرجاء ادخال حروف عربية فقط!");

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
  $("[name='family_type']").bootstrapSwitch();
});

