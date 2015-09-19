$(document).ready(function(){

  $("[name='family_type']").bootstrapSwitch();

  $("#Regdoctype_Id").change(function(){
    $(this).find("option:selected").each(function(){
        if($(this).attr("value")==2){
            $(".box").show().addClass("animated fadeIn");
        }
        else{
            $(".box").hide(300);
        }
    });
  }).change();

  $('#add').on('hidden.bs.modal', function(){
    $(".box").hide();
    $(this).removeData('bs.modal');
    $('.selectpicker').selectpicker('val', null);
    $('#add_personal_form').validate().resetForm();
  });

  $('#Birth_Date, #Enlistingdate, #Certification_Issuance_Date').datetimepicker({
    useCurrent: false,
    viewMode: 'years',
    format: 'YYYY-MM-DD',
    locale: 'ar-sa'
  });
});