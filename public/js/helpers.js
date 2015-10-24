$(document).ready(function(){
  // Custom function for bootstrap notify
  custNotify = function(notType,msgType,msg,sign,enterAnimat,exitAnimat){
    $.notify({
      message: "<p class='font h5 text-center'><i class='glyphicon glyphicon-"+sign+"'></i>&nbsp;<strong>"+msgType+":</strong> "+msg+" </p>"
      },{
      type: notType,
      allow_dismiss: true,
      showProgressbar: false,
      placement: {
        from: 'top',
        align: 'center'
      },
      mouse_over: null,
      newest_on_top: true,
      animate: {
        enter: 'animated '+enterAnimat,
        exit: 'animated '+exitAnimat,
      },
    });
  }
  $.fn.serializeObject = function(){
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };

  /*this is to parse url for error or success msgs*/
  $getMsg = (function(a){
    if(a=="") return {};
    var b = {};
    for(var i =0; i<a.length; ++i){
      var p=a[i].split('=',2);
      if(p.length ==1)
        b[p[0]]="";
      else
        b[p[0]]=decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
  })(window.location.search.substr(1).split('&'));

  /* this to replace the url*/
  replaceUrl = function(url) {
    window.history.pushState("","",url);
  }

  /*----------- Global custom valitation functions----------*/
  jQuery.validator.addMethod("arabicLettersOnly", function(value, element) {
  return this.optional(element) || /^[أ-ي,ﻻ,ء]+$/i.test(value);
  }, "الرجاء ادخال حروف عربية فقط!");
  jQuery.validator.addMethod("arabicLettersWithSpacesOnly", function(value, element) {
    return this.optional(element) || /^[أ-ي,ﻻ,ء," "]+$/i.test(value);
  }, "الرجاء ادخال حروف عربية فقط!"); 
  jQuery.validator.addMethod("englishLettersWithSpacesOnly", function(value, element) {
    return this.optional(element) || /^[a-z," "]+$/i.test(value);
  }, "الرجاء ادخال حروف انجليزية فقط!");
  jQuery.validator.addMethod("greaterThan",function(value, element, params) {
    if (!/Invalid|NaN/.test(new Date(value))) {
        return new Date(value) > new Date($(params).val());
    }
    return isNaN(value) && isNaN($(params).val()) || (Number(value) > Number($(params).val())); 
  },'يجب ان يكون تاريخ الاكتتاب اكبر من الميلاد!');

  $('.selectpicker').selectpicker().change(function(){
    $(this).valid()
  });
});