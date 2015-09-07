$(document).ready(function(){
  
  $("[data-toggle=tooltip]").tooltip();

  jQuery.validator.addMethod("arabicLettersOnly", function(value, element) {
    return this.optional(element) || /^[أ-ي,ﻻ,ء]+$/i.test(value);
  }, "الرجاء ادخال حروف عربية فقط!");

  $("#add_kinship_form").validate({
    rules:{
      kinship_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      kinship_name:{
        required: "الرجاء ادخال اسم صلة القرابة!",
        arabicLettersOnly: "الرجاء ادخال حروف عربية فقط!",
      },
    },
    highlight: function(element) {
      $(element).closest('.row').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.row').removeClass('has-error');
    },
  });

  $("#edit_kinship_form").validate({
    rules:{
      kinship_name:{
        required: true,
        arabicLettersOnly: true,
      },
    },
    messages:{
      kinship_name:{
        required: "الرجاء ادخال اسم صلة القرابة!",
        arabicLettersOnly: "الرجاء ادخال حروف عربية فقط!",
      },
    },
    highlight: function(element) {
      $(element).closest('.row').addClass('has-error').removeClass('has-success');
    },
    unhighlight: function(element) {
      $(element).closest('.row').removeClass('has-error').addClass('has-success');
    },
  });

  $("#search_kinship").validate({
    rules:{
      searchName:{
        required: true,
      },
    },
    messages:{
      searchName:{
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


  /*----------- on add kinship----------*/
  $('#add_kinship_btn').on('click', function(e){
    e.preventDefault();
    var obj = $('#add_kinship_form').serializeObject();
    $.post('/kinship/new_kinship', obj, function(result){
      var tr= "<tr>"+
                "<td class='text-center'>"+result.id+"</td>"+
                "<td class='text-center'> "+result.kinship_name+"</td>"+
                "<td class='text-center'>"+
                  "<p data-placement='top' data-toggle='tooltip' title='تعديل'>"+
                    "<button id='edit_btn' data-title='Edit' data-toggle='modal' data-target='#edit' class='btn btn-primary btn-xs'><span class='glyphicon glyphicon-pencil'></span></button>"+
                  "</p>"+
                "</td>"+
                "<td class='text-center'>"+
                  "<p data-placement='top' data-toggle='tooltip' title='إلغاء'>"+
                    "<button id='delete_btn' data-title='Delete' data-toggle='modal' data-target='#delete' class='btn btn-danger btn-xs'><span class='glyphicon glyphicon-trash'></span></button>"+
                  "</p>"+
                "</td>"+
              "</tr>";
      $('#add').modal('hide');               
      $('#kinship_table').prepend(tr);
    });
  });
});