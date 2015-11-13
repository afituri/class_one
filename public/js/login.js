$(document).ready(function(){
  // Validation function start
  /*----------- validate in login form----------*/
  $("#login_form").validate({
    rules:{
      username:{
        required: true,
        email: true
      },
      password:{
        required: true,
      },
    },
    messages:{
      username:{
        required: "",
        email: "خطأ: الرجاء ادخال بريد الكتروني صالح!"
      },
      password:{
        required: "",
      }
    },
    // errorClass: 'custom-error',
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
  if ($getMsg["msg"]==1){
    custNotify("danger","خطأ","الرجاء التأكد من اسم المستخدم وكلمة المرور","warning-sign","bounceIn","bounceOut");
    replaceUrl('/');
  }
});
