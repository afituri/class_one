$(document).ready(function(){
  // Validation function start
  /*----------- validate in add user----------*/
  $("#add_user_form").validate({
    rules:{
      name:{
        required: true
      },
      email:{
        required: true,
        email: true
      },
      user_confirm_email:{
        required: true,
        email: true,
        equalTo: "#user_email"
      },
      phone:{
        required: true,
        number: true,
        maxlength: 14,
        minlength: 10
      },
      password:{
        required: true,
      },
      user_confirm_password:{
        required: true,
        equalTo: "#user_password",
      },
    },
    messages:{
      name:{
        required: "الرجاء ادخال اسم المستحدم!"
      },
      email:{
        required: "الرجاء ادخال البريد الالكتروني!",
        email: "الرجاء ادخال بريد الكتروني صالح!"
      },
      user_confirm_email:{
        required: "الرجاء ادخال البريد الالكتروني!",
        email: "الرجاء ادخال بريد الكتروني صالح!",
        equalTo: "عفوا البريد الالكتروني غير مطابق!"
      },
      phone:{
        required: "الرجاء ادخال رقم الهاتف!",
        number: "<h6>يجب ان يحتوي رقم الهاتف علي ارقام صحيحة فقط!</h6>",
        maxlength: "<h6>يجب ان يحتوي رقم الهاتف علي اﻷكثر 14 رقم</h6>",
        minlength: "<h6>يجب ان يحتوي رقم الهاتف علي اﻷقل 10 رقم</h6>",
      },
      password:{
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
      // edit_user_password:{
      //   required: true,
      // },
      edit_user_confirm_password:{
        // required: true,
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
  $('body').on('click','#edit_btn', function(){
    var id = $(this).val();
     $.get('/user/get_user/'+id,function(data){
      $('#id_user').val(id);
      $('#edit_user_name').val(data.name);
      $('#edit_user_phone').val(data.phone);
     });
  });
  $('body').on('click','#delete_btn', function(){
    var id = $(this).val();
    $('#id_u').val(id);
  });

  if($getMsg["msg"]==1){
    custNotify("success","نجاح","تم إضافة مستخدم بنجاح","ok-sign","bounceInDown","bounceOutUp");
    replaceUrl('/user');    
  } else if ($getMsg["msg"]==2) {
    custNotify("danger","خطأ","لم تتم عملية الاضافة","warning-sign","bounceIn","bounceOut");
    replaceUrl('/user');
  } else if($getMsg["msg"]==3){
    custNotify("success","نجاح","تم التعديل بنجاح","ok-sign","bounceInDown","bounceOutUp");
    replaceUrl('/user');   
  } else if($getMsg["msg"]==4){
    custNotify("danger","خطأ","لم تتم عملية التعديل","warning-sign","bounceIn","bounceOut");
    replaceUrl('/user');   
  }else if($getMsg["msg"]==5){
    custNotify("success","نجاح","تم مسح مستخدم بنجاح","ok-sign","bounceInDown","bounceOutUp");
    replaceUrl('/user');   
  } else if($getMsg["msg"]==6){
    custNotify("danger","خطأ","لم تتم عملية المسح","warning-sign","bounceIn","bounceOut");
    replaceUrl('/user');   
  }
});