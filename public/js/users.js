$(document).ready(function(){
  // Validation function start
  /*----------- validate in add user----------*/
  $("#add_user_form").validate({
    rules:{
      user_name:{
        required: true
      },
      user_email:{
        required: true,
        email: true
      },
      user_confirm_email:{
        required: true,
        email: true,
        equalTo: "#user_email"
      },
      user_phone:{
        required: true,
        number: true,
        maxlength: 14,
        minlength: 10
      },
      user_password:{
        required: true,
      },
      user_confirm_password:{
        required: true,
        equalTo: "#user_password",
      },
    },
    messages:{
      user_name:{
        required: "الرجاء ادخال اسم المستحدم!"
      },
      user_email:{
        required: "الرجاء ادخال البريد الالكتروني!",
        email: "الرجاء ادخال بريد الكتروني صالح!"
      },
      user_confirm_email:{
        required: "الرجاء ادخال البريد الالكتروني!",
        email: "الرجاء ادخال بريد الكتروني صالح!",
        equalTo: "عفوا البريد الالكتروني غير مطابق!"
      },
      user_phone:{
        required: "الرجاء ادخال رقم الهاتف!",
        number: "<h6>يجب ان يحتوي رقم الهاتف علي ارقام صحيحة فقط!</h6>",
        maxlength: "<h6>يجب ان يحتوي رقم الهاتف علي اﻷكثر 14 رقم</h6>",
        minlength: "<h6>يجب ان يحتوي رقم الهاتف علي اﻷقل 10 رقم</h6>",
      },
      user_password:{
        required: "الرجاء ادخال كلمة المرور!",
      },
      user_confirm_password:{
        required: "الرجاء ادخال كلمة المرور مرة اخرى!",
        equalTo: "عفوا كلمة المرور عير متطابقة!",
      }
    },
    errorClass: 'custom-error',
    highlight: function(element) {
      $(element).closest('.form-group').addClass('has-error').removeClass('has-success');
    },
    unhighlight: function(element) {
      $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
    },
  });
  /*----------- validate in edit city----------*/
  $("#edit_user_form").validate({
    rules:{
      edit_user_name:{
        required: true
      },
      edit_user_phone:{
        required: true,
        number: true,
        maxlength: 14,
        minlength: 10
      },
      edit_user_password:{
        required: true,
      },
      edit_user_confirm_password:{
        required: true,
        equalTo: "#edit_user_password",
      },
    },
    messages:{
      edit_user_name:{
        required: "الرجاء ادخال اسم المستحدم!"
      },
      edit_user_phone:{
        required: "الرجاء ادخال رقم الهاتف!",
        number: "<h6>يجب ان يحتوي رقم الهاتف علي ارقام صحيحة فقط!</h6>",
        maxlength: "<h6>يجب ان يحتوي رقم الهاتف علي اﻷكثر 14 رقم</h6>",
        minlength: "<h6>يجب ان يحتوي رقم الهاتف علي اﻷقل 10 رقم</h6>",
      },
      edit_user_password:{
        required: "الرجاء ادخال كلمة المرور!",
      },
      edit_user_confirm_password:{
        required: "الرجاء ادخال كلمة المرور مرة اخرى!",
        equalTo: "عفوا كلمة المرور عير متطابقة!",
      }
    },
    errorClass: 'custom-error',
    highlight: function(element) {
      $(element).closest('.form-group').addClass('has-error').removeClass('has-success');
    },
    unhighlight: function(element) {
      $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
    }
  });
  
  $('#add').on('hidden.bs.modal', function(){
    $(this).removeData('bs.modal');
    $('.form-group').removeClass('has-error has-success');
    $('#add_user_form').validate().resetForm();
  });

  $('#edit').on('hidden.bs.modal', function(){
    $(this).removeData('bs.modal');
    $('.form-group').removeClass('has-error has-success');
    $('#edit_user_form').validate().resetForm();
  });

  // Validation function end
});