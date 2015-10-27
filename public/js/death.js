$(document).ready(function(){
  $('#weight_edit').mask('0.000');
  $('#unatural_type').hide();
  $('#death_type').on('change', function(){
    var id = $(this).val();
    if(id==2){
      $('#unatural_type').show(100);
    }else{
      $('#unatural_type').hide(100);
    }
  });
  $('body').on('click','#add_death', function(){
    var id = $(this).val();
    $.get('/death/personal_id/'+id,function(data){
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
  $('.edit_death_no').on('click',function(){

    custNotify("danger","خطأ","هذا الشخص غير متوفي!","warning-sign","bounceIn","bounceOut");
  });
});