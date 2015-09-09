$(document).ready(function(){
  $('body').on('click', '.edit_btn',  function(){
    var office_id = $(this).val(),
        office_name= $('#br-'+office_id).data('name');
        office_branch= $('#br-'+office_id).data('branch_id');
        office_manucipality= $('#br-'+office_id).data('manucipality_id');
        office_latitude= $('#br-'+office_id).data('latitude');
        office_longitude= $('#br-'+office_id).data('longitude');

        // console.log(office_branch);

    $('#edit_office_branch').selectpicker('val',office_branch);
    $('#edit_office_manucipality').selectpicker('val',office_manucipality);
    $('#edit_office_name').val(office_name);
    $('#edit_latitude').val(office_latitude);
    $('#edit_longitude').val(office_longitude);  
    $('#office_id').val(office_id);

  });
});
