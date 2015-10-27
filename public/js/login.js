$(document).ready(function(){
  // Validation function start
  /*----------- validate in login form----------*/
  $("#login_form").validate({
    rules:{
      user_email:{
        required: true,
        email: true
      },
      user_password:{
        required: true,
      },
    },
    messages:{
      user_email:{
        required: "",
        email: "خطأ: الرجاء ادخال بريد الكتروني صالح!"
      },
      user_password:{
        required: "",
      }
    },
    errorClass: 'custom-error',
    highlight: function(element) {
      $(element).closest('.form-group').addClass('has-error').removeClass('has-success');
    },
    unhighlight: function(element) {
      $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
    },
    invalidHandler: function(event, validator) {
      // 'this' refers to the form
      var errors = validator.numberOfInvalids();
      if (errors) {
        custNotify("danger","خطأ","الرجاء ادخال اسم المستخدم وكلمة المرور","ok-sign","bounceIn","bounceOut");
      }
    }
  });
  // Validation function end
});
