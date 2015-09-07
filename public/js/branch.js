$(document).ready(function(){
  $('body').on('click', '.edit_btn',  function(){
    var branch_id = $(this).val(),
        branch_name= $('#br-'+branch_id).data('name');
        branch_region= $('#br-'+branch_id).data('region_id');
        console.log(branch_region);

    $('#edit_branch_region').selectpicker('val',branch_region);
    $('#edit_branch_name').val(branch_name);
    $('#branch_id').val(branch_id);

  });
});
