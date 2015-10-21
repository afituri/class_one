$(document).ready(function(){
  $('#Birth_Date, #Enlistingdate').datetimepicker({
    useCurrent: false,
    viewMode: 'years',
    format: 'YYYY-MM-DD',
    locale: 'ar-sa'
  });
  $("[data-toggle=tooltip]").tooltip();
  $('#weight').mask('0.000');
  $("[name='family_type']").bootstrapSwitch();
  // $('body').on('switch-change','#mySwitch', function () {
  //   alert("dd");
  // });
   
  $("#child-table").hide(0);
  $('#toggle-child').change(function() {
    if ($(this).prop('checked') == true) {
      $("#child-table").show(200);
    }
    else {
      $("#child-table").hide(200);
    }
  })
  $('#get_region').on('change',function() {
    var id = $('#get_region').val();
    $.get('/get_branch_by_region_id'+id,function(result){
      $('#get_branch').empty();
      for ( var i = 0; i < result.length;  i++ ) {
        $('#get_branch').append("<option value = '"+result[i].id+"'>"+result[i].branch_name+"</option>");
      }
    });
  });
  $('#get_region').on('change', function(){
    var id = $(this).val();
    get_branches('#get_branch',id);
  });

  /*-------on select region edt--------*/
  // $('#region_edit').on('change', function(){
  //   var id = $(this).val();
  //   get_branches('#edit_office_branch',id);
  // });

  /*------get branch function-----*/
  function get_branches(select_id, branch_id) {
    $(select_id).empty().selectpicker('refresh');
    if(branch_id) {
      $.get('/divorce/get_branch_by_region_id/'+branch_id,function(result){
        for (key in result){
          $(select_id).append("<option value = '"+result[key].id+"'>"+result[key].branch_name+"</option>").selectpicker('refresh');  
        }
      });
    }
  }
  
});    