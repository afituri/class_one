$(document).ready(function(){
  $('body').on('click', '.edit_btn',  function(){
    var office_id = $(this).val(),
        office_name= $('#br-'+office_id).data('name');
        office_region= $('#br-'+office_id).data('region');
        office_branch= $('#br-'+office_id).data('branch_id');
        office_manucipality= $('#br-'+office_id).data('manucipality_id');
        office_latitude= $('#br-'+office_id).data('latitude');
        office_longitude= $('#br-'+office_id).data('longitude');

        // console.log(office_branch);
    $('#region_edit').selectpicker('val',office_region);
    $('#edit_office_branch').selectpicker('val',office_branch);
    $('#edit_office_manucipality').selectpicker('val',office_manucipality);
    $('#edit_office_name').val(office_name);
    $('#edit_latitude').val(office_latitude);
    $('#edit_longitude').val(office_longitude);  
    $('#office_id').val(office_id);
  });

  /*------get branch function-----*/
  function get_branches(select_id, branch_id) {
    if(branch_id) {
      $.get('/branch/get_branch/'+branch_id,function(result){
        $(select_id).empty();
        for (key in result){
          $(select_id).append("<option value = '"+result[key].id+"'>"+result[key].branch_name+"</option>").selectpicker('refresh');  
        }
      });
    }
  }

  /*-------on select region add--------*/
  $('#region_add').on('change', function(){
    var id = $(this).val();
    get_branches('#branches_add',id);
  });
  /*-------on select region edt--------*/
  $('#region_edit').on('change', function(){
    var id = $(this).val();
    get_branches('#branches_edit',id);
  });
});
