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
        custNotify("danger","خطا","لا توجد بيانات","ok-sign","bounceInDown","bounceOutUp");
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
        $('#Office_edit').val(data.foffice);
        if(data.result.newborn_reporting==2){
          $('#region_show_edit').show();
          region(data.offic[0].region,data.offic[0].branche);
          Branches(data.offic[0].branche,data.offic[0].office);
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
        if(data[key].id==ids){
          var select = 'selected';
        }else{
          var select = ''
        }
        $('#Branches_edit').append("<option value = '"+data[key].id+"' "+select+">"+data[key].branch_name+"</option>").selectpicker('refresh');
      }
    });  
  };
  Branches = function(id,ids){
    $('#Offices_edit').empty();
    $('#Offices_edit').selectpicker('refresh');
    $.get('/Office/get_Office/'+id,function(data){
      $('#Offices_edit').append("<option value = '' style='colr:grey; display:none;'> السجل المدني</option>").selectpicker('refresh');
      for(key in data){
        if(data[key].id==ids){
          var select = 'selected';
        }else{
          var select = ''
        }
        $('#Offices_edit').append("<option value = '"+data[key].id+"' "+select+">"+data[key].office_name+"</option>").selectpicker('refresh');
      }
    });
  };
});