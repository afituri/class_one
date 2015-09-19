$(document).ready(function(){
  
  $("[data-toggle=tooltip]").tooltip();
  jQuery.validator.addMethod("arabicLettersOnly", function(value, element) {
    return this.optional(element) || /^[أ-ي,ﻻ,' ',ء]+$/i.test(value);
  }, "الرجاء ادخال حروف عربية فقط!");

  /*----------- validate in add & edit Office----------*/
  $("#add_office_form, #edit_office_form").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      region:{
        required: true
      },
      BranchId:{
        required: true
      },
      ManucipalityId:{
        required: true
      },
      office_name:{
        required: true,
        arabicLettersOnly: true,
      },
      latitude:{
        required: true
      },
      longitude:{
        required:true
      },
    },
    messages:{
      region:{
        required: "الرجاء اختيار المنطقة!"
      },
      BranchId:{
        required: "الرجاء اختيار مكتب الاصدار!"
      },
      ManucipalityId:{
        required: "الرجاء اختيار البلدية!"
      },
      office_name:{
        required: "الرجاء ادخال اسم المنطقة!",
        arabicLettersOnly: "الرجاء ادخال حروف عربية فقط!",
      },
      latitude:{
        required: "الرجاء ادخال خط العرض!"
      },
      longitude:{
        required: "الرجاء ادخال خط الطول!"
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

  /*----------- validate in search Office----------*/
  $("#search_office").validate({
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
  
  /*------on click button edit_btn -----*/
  $('body').on('click', '.edit_btn',  function(){
    var office_id = $(this).val(),
        office_name= $('#br-'+office_id).data('name');
        office_region= $('#br-'+office_id).data('region');
        office_branch= $('#br-'+office_id).data('branch_id');
        office_manucipality= $('#br-'+office_id).data('manucipality_id');
        office_latitude= $('#br-'+office_id).data('latitude');
        office_longitude= $('#br-'+office_id).data('longitude');
    $('#region_edit').selectpicker('val',office_region);
    $('#edit_office_branch').selectpicker('val',office_branch);
    $('#edit_office_manucipality').selectpicker('val',office_manucipality);
    $('#edit_office_name').val(office_name);
    $('#edit_latitude').val(office_latitude);
    $('#edit_longitude').val(office_longitude);  
    $('#office_id_edit').val(office_id);
  });

  /*-------on select region add--------*/
  $('#region_add').on('change', function(){
    var id = $(this).val();
    get_branches('#branches_add',id);
  });

  /*-------on select region edt--------*/
  $('#region_edit').on('change', function(){
    var id = $(this).val();
    get_branches('#edit_office_branch',id);
  });

  /*------get branch function-----*/
  function get_branches(select_id, branch_id) {
    $(select_id).empty().selectpicker('refresh');
    if(branch_id) {
      $.get('/branch/get_branch/'+branch_id,function(result){
        for (key in result){
          $(select_id).append("<option value = '"+result[key].id+"'>"+result[key].branch_name+"</option>").selectpicker('refresh');  
        }
      });
    }
  }

  /*----------- Delete in modal Office----------*/
  $('body').on('click', '.delete_btn', function(){
    var office_id = $(this).val();
    console.log($(this).val());
    $("#office_id_delete").val($(this).val());
  });
  if ($getMsg["msg"]==1){
    custNotify("success","نجاح","تم حذف السجل المدني بنجاح","ok-sign","bounceInDown","bounceOutUp");
    replaceUrl('/office');    
  } else if ($getMsg["msg"]==2) {
    custNotify("danger","خطأ","لا يمكن حذف هذا السجل المدني لاعتماد كيانات اخرى عليها","warning-sign","bounceIn","bounceOut");
    replaceUrl('/office');
  } else if ($getMsg["msg"]==3){
    custNotify("success","نجاح","تمت إضافة سجل مدني جديد بنجاح","ok-sign","bounceInDown","bounceOutUp");
    replaceUrl('/office');    
  } else if ($getMsg["msg"]==4) {
    custNotify("success","نجاح","تم تعديل السجل المدني بنجاح","ok-sign","bounceInDown","bounceOutUp");
    replaceUrl('/office');
  }

  $('.selectpicker').selectpicker().change(function(){
    $(this).valid()
  });

});