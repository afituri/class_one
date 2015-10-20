$(document).ready(function(){
  $('body').on('click', '#search', function (e) {
    e.preventDefault();
    $('#search_marriage').submit();
  });

  $('body').on('click', '#search_F', function (e) {
    e.preventDefault();
    $('#search_marriage_F').submit();
  });
  //#save_Marriage
  $('body').on('click', '#save_Marriage', function (e) {
    if($("input[type='radio'].radioBtnClass").is(':checked')) {
    var card_type = $("input[type='radio'].radioBtnClass:checked").val();
    }
    alert("id : "+card_type);
    alert($("#tbody #mariage"+card_type).text());
    alert($("#tbody #mariag"+card_type).text());
    alert($("#tbody #maria"+card_type).text());

    // select the radio by its id
    // bind a function to the change event
      
    
/*    alert($('input[name="radio_M"]:checked').val());
    alert($('input:radio[name="radio_M"]').filter(":checked").val());
    alert(jq("input[name='radio_M']:checked").val());*/
  });

  $("#search_marriage_F").submit(function(e) {
    console.log($("form").serializeObject().searchVal_F);
    var isvalidate=$("#search_marriage_F").valid();
    if(isvalidate){
    $.post("/searchMarriage", $("#search_marriage_F").serializeObject(), function(data, error){
        if(data.stat !=true){
          alert("no");
        } 
        else {
         console.log(data.result[0]);
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
            '<input type="radio",value="'+data.result[i].Person_Id+'", name="radio_F"></input></p></td>');
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
         console.log(data.result[0]);
         $("#tbody").empty();
         for (var i = 0; i < data.result.length; i++) {
          date = new Date(data.result[i].Birth_Date);
          var day = date.getDate();
          var monthIndex = date.getMonth();
          var year = date.getFullYear();
          $("#tbody").append('<tr>'+
            '<td class="text-center" id='+"mariage"+data.result[i].Person_Id+'>'+data.result[i].Arabic_Familyname+'</td>'+
            '<td class="text-center" id='+"mariag"+data.result[i].Person_Id+'>'+year+"-"+monthIndex+"-"+day+'</td>'+
            '<td class="text-center" id='+"maria"+data.result[i].Person_Id+'>'+data.result[i].kinship_name+'</td>'+
            '<td class="text-center" >'+
            '<p >'+
            '<input class="radioBtnClass" id="mariag" type="radio" value="'+data.result[i].Person_Id+'", name="radio_M"></input></p></td>');
         };

        }
      });
    }
    return false

    });
 $('.add_marriage').on('click',function(){
    // var myDataAttr = $(this).val();
    // alert("oh man");
    // $('#name').val($('[data-id = "'+myDataAttr+'"]').data('name'));
    // $('#name_en').val($('[data-id = "'+myDataAttr+'"]').data('name_en'));
    // $('#id').val($('[data-id = "'+myDataAttr+'"]').data('id'));
  });

});