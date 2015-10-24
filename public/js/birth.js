$(document).ready(function(){
  $('#region_show').hide();
  $('#weight_edit').mask('0.000');
  $('#newborn_reporting_edit').on('change', function(){
    var id = $(this).val();
    if(id==2){
      $('#region_show_edit').show();
    }else{
      $('#region_show_edit').hide();
    }
  });
  $('#newborn_reporting').on('change', function(){
    var id = $(this).val();
    if(id==2){
      $('#region_show').show();
    }else{
      $('#region_show').hide();
    }
  });
  $('body').on('click','#delete_btn', function(){
    var id = $(this).val();
    $('#birth_id_delete').val(id);
  });
  $('#region').on('change', function(){
    var id = $(this).val();
    $('#Branches').empty();
    $('#Offices').empty();
    $('#Branches').append("<option value = '' style='colr:grey; display:none;'> مكتب الاصدار</option>").selectpicker('refresh');
    $('#Offices').append("<option value = '' style='colr:grey; display:none;'> السجل المدني</option>").selectpicker('refresh');
    $.get('/branch/get_branch/'+id,function(data){
      for(key in data){
          $('#Branches').append("<option value = '"+data[key].id+"'>"+data[key].branch_name+"</option>").selectpicker('refresh');
        }
    });
  });

  $('#Branches').on('change', function(){
    var id = $(this).val();
    $('#Offices').empty();
    $('#Offices').selectpicker('refresh');
    $.get('/Office/get_Office/'+id,function(data){
      $('#Offices').append("<option value = '' style='colr:grey; display:none;'> السجل المدني</option>").selectpicker('refresh');
      for(key in data){
          $('#Offices').append("<option value = '"+data[key].id+"'>"+data[key].office_name+"</option>").selectpicker('refresh');
        }
    });
  });

  $('#country').on('change', function(){
    var id = $(this).val();
    $('#Cities').empty();
    $.get('/city/get_city/'+id,function(data){
      for(key in data){
          $('#Cities').append("<option value = '"+data[key].id+"'>"+data[key].city_name+"</option>").selectpicker('refresh');
        }
    });
  });
///////////////////////////////////////////////////////////////////////
  $('body').on('click','#edit_btn', function(){
    var id = $(this).val();
    $.get('/birth/get_birth/'+id,function(data){
      if(!data){
        custNotify("danger","خطا","لا توجد بيانات","ok-sign","bounceIn","bounceOut");
      }else{        
        $('#edit_name').text('تعديل بيانات '+data.result.Personal.Arabic_Firstname);
        $('#PersonalId_edit').val(id);
        $('#birth_type_edit').selectpicker('val',data.result.birth_type);
        $('#children_no_edit').selectpicker('val',data.result.children_no);
        $('#informer_type_edit').selectpicker('val',data.result.informer_type);
        $('#informer_name_edit').val(data.result.informer_name);
        $('#informer_address_edit').val(data.result.informer_address);
        $('#record_no_edit').val(data.result.record_no);
        $('#record_paper_no_edit').val(data.result.record_paper_no);
        $('#place_of_birth_edit').selectpicker('val',data.result.place_of_birth);
        $('#newborn_type_edit').selectpicker('val',data.result.newborn_type);
        $('#newborn_reporting_edit').selectpicker('val',data.result.newborn_reporting);
        $('#newborn_state_edit').selectpicker('val',data.result.newborn_state);        
        $('#blood_type_edit').selectpicker('val',data.result.blood_type);
        $('#newborn_health_edit').selectpicker('val',data.result.newborn_health);
        $('#pregnancy_period_edit').selectpicker('val',data.result.pregnancy_period);
        $('#weight_edit').val(data.result.weight);
        $('#midwife_type_edit').selectpicker('val',data.result.midwife_type);        
        $('#midwife_name_edit').val(data.result.midwife_name);
        if(data.result.newborn_reporting==2){
          $('#region_show_edit').show();
          region(data.offic[0].region,data.offic[0].branche);
          Branches(data.offic[0].branche,data.offic[0].offic);
          $('#region_edit').selectpicker('val',data.offic[0].region);
        }else{
          $('#region_show_edit').hide();
        }
        $('#edit').modal('show');
      }
    });
  });
  $('#region_edit').on('change', function(){
    var id = $(this).val();
    region(id,null);
  });

  $('#Branches_edit').on('change', function(){
    var id = $(this).val();
    Branches(id,null);  
  });
  region = function(id,ids){
    $('#Branches_edit').empty();
    $('#Offices_edit').empty();
    $('#Branches_edit').append("<option value = '' style='colr:grey; display:none;'> مكتب الاصدار</option>").selectpicker('refresh');
    $('#Offices_edit').append("<option value = '' style='colr:grey; display:none;'> السجل المدني</option>").selectpicker('refresh');
    $.get('/branch/get_branch/'+id,function(data){
      for(key in data){
        $('#Branches_edit').append("<option value = '"+data[key].id+"'>"+data[key].branch_name+"</option>").selectpicker('refresh');
      }
    });  
  };
  Branches = function(id,ids){
    $('#Offices_edit').empty();
    $('#Offices_edit').selectpicker('refresh');
    $.get('/Office/get_Office/'+id,function(data){
      $('#Offices_edit').append("<option value = '' style='colr:grey; display:none;'> السجل المدني</option>").selectpicker('refresh');
      for(key in data){
        $('#Offices_edit').append("<option value = '"+data[key].id+"'>"+data[key].office_name+"</option>").selectpicker('refresh');
      }
    });
  };

  // Add New Born Validation Start
  $("#new_birth_form").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    ignore: [],
    rules:{
      Arabic_Firstname:{
        required: true,
        arabicLettersWithSpacesOnly: true
      },
      Gender:{
        required: true
      },
      Birth_Date:{
        required: true
      },
      Enlistingdate:{
        required: true,
        greaterThan: "#Birth_Date"
      },
      Birth_Place:{
        required: true,
        arabicLettersWithSpacesOnly: true
      },
      country:{
        required: true
      },
      city_Id:{
        required: true
      },
      Motherperson_Id:{
        required: true
      },
      birth_type:{
        required: true
      },
      children_no:{
        required: true
      },
      informer_type:{
        required: true
      },
      informer_name:{
        required: true,
        arabicLettersWithSpacesOnly: true
      },
      informer_address:{
        required: true
      },
      record_no:{
        required: true
      },
      record_paper_no:{
        required: true
      },
      place_of_birth:{
        required: true
      },
      newborn_type:{
        required: true
      },
      newborn_reporting:{
        required: true
      },
      newborn_state:{
        required: true
      },
      blood_type:{
        required: true
      },
      birth_state:{
        required: true
      },
      newborn_health:{
        required: true
      },
      pregnancy_period:{
        required: true
      },
      weight:{
        required: true
      },
      midwife_type:{
        required: true
      },
      midwife_name:{
        required: true,
        arabicLettersWithSpacesOnly: true
      }
    },
    messages:{
      Arabic_Firstname:{
        required: "الرجاء ادخال اسم المولود!"
      },
      Gender:{
        required: "الرجاء اختيار جنس المولود!"
      },
      Birth_Date:{
        required: "الرجاء ادخال تاريخ الميلاد!"
      },
      Enlistingdate:{
        required: "الرجاء ادخال تاريخ اﻹكتتاب!"
      },
      Birth_Place:{
        required: "الرجاء ادخال مكان الميلاد!"
      },
      country:{
        required: "الرجاء اختيار بلد الميلاد!"
      },
      city_Id:{
        required: "الرجاء اختيار مدينة الميلاد!"
      },
      Motherperson_Id:{
        required: "الرجاء اختيار اسم اﻷم!"
      },
      birth_type:{
        required: "الرجاء اختيار نوع الولادة!"
      },
      children_no:{
        required: "الرجاء اختيار عدد الاولاد!"
      },
      informer_type:{
        required: "الرجاء اختيار نوع المبلغ!"
      },
      informer_name:{
        required: "الرجاء ادخال اسم المبلغ!"
      },
      informer_address:{
        required: "الرجاء ادخال عنوان المبلغ!"
      },
      record_no:{
        required: "الرجاء ادخال رقم السجل!"
      },
      record_paper_no:{
        required: "الرجاء ادخال رقم ورقة السجل!"
      },
      place_of_birth:{
        required: "الرجاء اختيار مكان الواقعة!"
      },
      newborn_type:{
        required: "الرجnewborn_healthاء اختيار كيفية الولادة!"
      },
      newborn_reporting:{
        required: "الرجاء اختيار نوع التبليغ!"
      },
      newborn_state:{
        required: "الرجاء اختيار حالة المولود!"
      },
      blood_type:{
        required: "الرجاء اختيار فصيلة الدم!"
      },
      birth_state:{
        required: "الرجاء اختيار حالة الولادة!"
      },
      newborn_health:{
        required: "الرجاء اختيار حالة المولود الصحية!"
      },
      pregnancy_period:{
        required: "الرجاء اختيار مدة الحمل!"
      },
      weight:{
        required: "الرجاء ادخال وزن المولود!"
      },
      midwife_type:{
        required: "الرجاء اختيار طبيب او قابلة"
      },
      midwife_name:{
        required: "الرجاء ادخال اسم الطبيب او القابلة!"
      }
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
  // Function Validation Tabs
  $("#new_birth_form").on('submit', function () {
    var isValid = $(this).valid();
    if (this.hasChildNodes('.nav.nav-tabs')) {
      var validator = $(this).validate();
      $(this).find("input").each(function () {
        if (!validator.element(this)) {
          isValid = false;
          $('a[href=#' + $(this).closest('.tab-pane:not(.active)').attr('id') + ']').tab('show');
          return false;
        }
      });
    }
    if (isValid) {
      // do stuff
    }
  });

  $('#add').on('hidden.bs.modal', function(){
    $(this).removeData('bs.modal');
    $('#new_birth_form').validate().resetForm();
  });
  // Add New Born Validation End

});