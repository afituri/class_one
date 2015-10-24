$(document).ready(function(){
  $('#region_show').hide();
  $('#weight_edit').mask('0.000');
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
        $.notify({
          title: "<strong>خطا:</strong> ",
          message: "لا توجد بيانات ميلاد"
        },{
          type: 'danger',
          allow_dismiss: true,
          showProgressbar: false,
          placement: {
            from: 'top',
            align: 'center'
          },
          mouse_over: null,
          newest_on_top: true,
          animate: {
            enter: 'animated flipInY',
            exit: 'animated flipOutX'
          },
        });
      }else{
        
        $('#edit_name').text('تعديل بيانات '+data.Personal.Arabic_Firstname);
        $('#PersonalId_edit').val(id);
        $('#birth_type_edit').selectpicker('val',data.birth_type);
        $('#children_no_edit').selectpicker('val',data.children_no);
        $('#informer_type_edit').selectpicker('val',data.informer_type);
        $('#informer_name_edit').val(data.informer_name);
        $('#informer_address_edit').val(data.informer_address);
        $('#record_no_edit').val(data.record_no);
        $('#record_paper_no_edit').val(data.record_paper_no);
        $('#place_of_birth_edit').selectpicker('val',data.place_of_birth);
        $('#newborn_type_edit').selectpicker('val',data.newborn_type);
        $('#newborn_reporting_edit').selectpicker('val',data.newborn_reporting);
        $('#newborn_state_edit').selectpicker('val',data.newborn_state);        
        $('#blood_type_edit').selectpicker('val',data.blood_type);
        $('#newborn_health_edit').selectpicker('val',data.newborn_health);
        $('#pregnancy_period_edit').selectpicker('val',data.pregnancy_period);
        $('#weight_edit').val(data.weight);
        $('#midwife_type_edit').selectpicker('val',data.midwife_type);        
        $('#midwife_name_edit').val(data.midwife_name);
        if(data.newborn_reporting==2){
          $('#region_show_edit').show();
        }else{
          $('#region_show_edit').hide();
        }
        $('#edit').modal('show');
      }
    });
  });
});