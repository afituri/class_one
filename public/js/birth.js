$(document).ready(function(){
  $('body').on('change', '#region', function(){
    var id = $(this).val();
    $('#Branches').empty();
    $('#Offices').empty();
    $.get('/branch/get_branch/'+id,function(data){
      for(key in data){
          $('#Branches').append("<option value = '"+data[key].id+"'>"+data[key].branch_name+"</option>").selectpicker('refresh');
        }
    });
  });

  $('body').on('change', '#Branches', function(){
    var id = $(this).val();
    $('#Offices').empty();
    $.get('/Office/get_Office/'+id,function(data){
      for(key in data){
          $('#Offices').append("<option value = '"+data[key].id+"'>"+data[key].office_name+"</option>").selectpicker('refresh');
        }
    });
  });

  $('body').on('change', '#country', function(){
    var id = $(this).val();
    $('#Cities').empty();
    $.get('/city/get_city/'+id,function(data){
      for(key in data){
          $('#Cities').append("<option value = '"+data[key].id+"'>"+data[key].city_name+"</option>").selectpicker('refresh');
        }
    });
  });

});