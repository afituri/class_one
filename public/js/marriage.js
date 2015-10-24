$(document).ready(function(){
  $('body').on('click', '#search', function (e) {
    e.preventDefault();
    $('#search_marriage').submit();
  });

  $('body').on('click', '#search_F', function (e) {
    e.preventDefault();
    $('#search_marriage_F').submit();
  });

  $("#search_marriage_F").submit(function(e) {
    var isvalidate=$("#search_marriage_F").valid();
    if(isvalidate){
    $.post("/searchMarriage", $("#search_marriage_F").serializeObject(), function(data, error){
        if(data.stat !=true){
          alert("no");
        } 
        else {
         $("#tbody_F").empty();
         for (var i = 0; i < data.result.length; i++) {
          date = new Date(data.result[i].Birth_Date);
          var day = date.getDate();
          var monthIndex = date.getMonth();
          var year = date.getFullYear();
          $("#tbody_F").append('<tr>'+
            '<td class="text-center">'+data.result[i].Arabic_Familyname+'</td>'+
            '<td class="text-center">'+year+"-"+monthIndex+"-"+day+'</td>'+
            '<td class="text-center">'+data.result[i].kinship_name+'</td>'+
            '<td class="text-center">'+
            '<p data-placement="top", data-toggle="tooltip", title="تحديد">'+
            '<input id='+"mariage"+data.result[i].PersonalId+' name="Familid" type="hidden" value="'+data.result[i].FamilyId+'"></input>'+
            '<input class="radioBtnClass" type="radio" value="'+data.result[i].PersonalId+'"  name="radio_F"></input></p></td>');
         };
        }
      });
    }
    return false
});

  $("#search_marriage").submit(function(e) {
    var isvalidate=$("#search_marriage").valid();
    if(isvalidate){
      $.post("/searchMarriage", $("#search_marriage").serializeObject(), function(data, error){
        if(data.stat !=true){
          alert("no");
        } 
        else {
         $("#tbody").empty();
         for (var i = 0; i < data.result.length; i++) {
          date = new Date(data.result[i].Birth_Date);
          var day = date.getDate();
          var monthIndex = date.getMonth();
          var year = date.getFullYear();
          $("#tbody").append('<tr>'+
            '<td class="text-center">'+data.result[i].Arabic_Familyname+'</td>'+
            '<td class="text-center">'+year+"-"+monthIndex+"-"+day+'</td>'+
            '<td class="text-center">'+data.result[i].kinship_name+'</td>'+
            '<td class="text-center" >'+
            '<p data-placement="top", data-toggle="tooltip", title="تحديد">'+
            '<input id='+"mariag"+data.result[i].PersonalId+' name="Familidm" type="hidden" value="'+data.result[i].FamilyId+'"></input>'+
            '<input id='+"maria"+data.result[i].PersonalId+' name="OfficeId" type="hidden" value="'+data.result[i].OfficeId+'"></input>'+
            '<input class="radioBtn" id="mariag" type="radio" value="'+data.result[i].PersonalId+'", name="radio_M"></input></p></td>');
         };

        }
      });
    }
    return false

    });

 $('.add_marriage').on('click',function(){
  if($("input[type='radio'].radioBtn").is(':checked')) {
    var card_type = $("input[type='radio'].radioBtn:checked").val();
  }
  if($("input[type='radio'].radioBtnClass").is(':checked')) {
    var card_typee = $("input[type='radio'].radioBtnClass:checked").val();
  }
  if (!card_type && !card_typee) {
    custNotify("danger","خطأ","الرجاء اختيار اسرة المتزوج!","warning-sign","bounceIn","bounceOut");
    $('.add_marriage').attr('href', '#');
  } else {
    $('.add_marriage').attr('href', '#add');
  }
    $('#husband_personal_Id').val(card_type);
    $('#husband_family_Id').val($("#tbody #mariag"+card_type).val());
    $('#wife_personal_Id').val(card_typee);
    $('#wife_family_Id').val($("#tbody_F #mariage"+card_typee).val());
    $('#OfficeId').val($("#tbody #maria"+card_type).val());
  });

 $('body').on('click', '#save_Marriage', function (e) {
    e.preventDefault();
    $('#new_marriage').submit();
  });

 $("#new_marriage").submit(function(e) {
     var isvalidate=$("#new_marriage").valid();
    if(isvalidate){
      $.post("/add_new_marriage", $("#new_marriage").serializeObject(), function(data, error){
        if(data){
        window.location.href ="/marriage?msg=22";
        } else {
        window.location.href ="/marriage?msg=33";
        }
      });
    }
    return false
  });

if($getMsg["msg"]==1){
  custNotify("success","نجاح","تم حذف العائلة بنجاح","ok-sign","bounceInDown","bounceOutUp");
  replaceUrl('/marriage');    
} else if ($getMsg["msg"]==2) {
  custNotify("danger","خطأ","لا يمكن حذف هذه العائ لاعتماد كيانات اخرى عليها","warning-sign","bounceIn","bounceOut");
  replaceUrl('/marriage');
} else if ($getMsg["msg"]==11) {
  custNotify("success","نجاح","لقد قمت بتعديل الحقول بنجاح","ok-sign","bounceInDown","bounceOut");
  replaceUrl('/marriage');
} else if ($getMsg["msg"]==22) {
  $('#add').modal('hide');
  custNotify("success","نجاح","لقد قمت باضافة واقة بنجاح","ok-sign","bounceInDown","bounceOut");
  replaceUrl('/marriage');
} else if ($getMsg["msg"]==33) {
   $('#add').modal('hide');
  custNotify("danger","خطأ","الرجاء تعبئة جميع البيانات بالطريقة الصحيحة","warning-sign","bounceIn","bounceOut");
  replaceUrl('/marriage');
}
});