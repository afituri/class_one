$(document).ready(function(){
  $('#inform_date, #divorce_date').datetimepicker({
    useCurrent: false,
    viewMode: 'years',
    format: 'YYYY-MM-DD',
    locale: 'ar-sa'
  });
  $("[data-toggle=tooltip]").tooltip();
  $('#weight').mask('0.000');
  $("[name='family_type']").bootstrapSwitch();
  /*............*/
  $("#child-table").hide(0);
  $('#toggle-child').change(function() {
    if ($(this).prop('checked') == true) {
      $("#child-table").show(200);
    }
    else {
      $("#child-table").hide(200);
    }
  });
  /*...........*/
  $('body').on('change', '#region', function(){
    var id = $(this).val();
    $('#Branches').empty();
    $('#Offices').empty();
    $('#Branches').append("<option value = '' style='colr:grey; display:none;'> مكتب الاصدار</option>").selectpicker('refresh');
    $('#Offices').append("<option value = '' style='colr:grey; display:none;'> السجل المدني</option>").selectpicker('refresh');
    $.get('/branch/get_branch/'+id,function(data){
      for(key in data){
          $('#Branches').append("<option value = '"+data[key].id+"'>"+data[key].branch_name+"</option>").selectpicker('refresh');
        }
    });
  });
/*.........Branches........*/
  $('body').on('change', '#Branches', function(){
    var id = $(this).val();
    $('#Offices').empty();
    $('#Offices').selectpicker('refresh');
    $.get('/Office/get_Office/'+id,function(data){
      $('#Offices').append("<option value = '' style='colr:grey; display:none;'> السجل المدني</option>").selectpicker('refresh');
      for(key in data){
          $('#Offices').append("<option value = '"+data[key].id+"'>"+data[key].office_name+"</option>").selectpicker('refresh');
        }
    });
  });
  /*-----------------------*/
  $('body').on('change', '#country', function(){
    var id = $(this).val();
    $('#Cities').empty();
    $.get('/city/get_city/'+id,function(data){
      for(key in data){
          $('#Cities').append("<option value = '"+data[key].id+"'>"+data[key].city_name+"</option>").selectpicker('refresh');
        }
    });
  });
/*---------------------*/
/*........waif......*/
  $('#open_family').on('click', function(){
   var id = $(this).val();
    $.get('/divorce/'+id,function(result){
    $('#waif_name').empty()
    $('#father_name').append("<input type = 'hidden' name='father_name' value="+result.fathers[0][0].Person_Id+"></input><label > ="+result.fathers[0][0].Arabic_Firstname+" "+result.fathers[0][0].Arabic_Fathername+" "+result.fathers[0][0].Arabic_Grandfathername+" "+result.fathers[0][0].Arabic_Familyname+"</label>");
    $('#waif_name').append("<option value = '' style='colr:grey; display:none;'> أسم الزوجة</option>").selectpicker('refresh');
      for(i in result.wifes){
        $('#waif_name').append('<option value='+result.wifes[0][i].Person_Id+'">'+result.wifes[0][i].Arabic_Firstname+' '+result.wifes[0][i].Arabic_Fathername+' '+result.wifes[0][i].Arabic_Grandfathername+' '+result.wifes[0][i].Arabic_Familyname+'</option>').selectpicker('refresh');
      }
    });
  });
  /*----------------*/
  // $('#open_family').on('click', function(){
  //  var id = $(this).val();
  //   $.get('/divorce/'+id,function(result){
  //   $('#waif_name').empty()
  //   $('#waif_name').append("<option value = '' style='colr:grey; display:none;'> أسم الزوجة</option>").selectpicker('refresh');
  //     for(i in result){
  //       alert(result[i].Arabic_Firstname);
  //       $('#waif_name').append('<option value='+result[i].Person_Id+'">'+result[i].Arabic_Firstname+' '+result[i].Arabic_Fathername+' '+result[i].Arabic_Grandfathername+' '+result[i].Arabic_Familyname+'</option>').selectpicker('refresh');
  //     }
  //   });
  // });
  /*--------------------*/
  /*.........dath......*/
  $('#waif_name').on('change', function(){
    var id = $(this).val();
    $.get('/divorce/Personal/'+id,function(result){
      $('#data').append('<label class="form-control">'+new Date(result[0].Birth_Date).getFullYear()+'/'+new Date(result[0].Birth_Date).getMonth()+'/'+new Date(result[0].Birth_Date).getDate()+'</label>');
    });
  /*..........suns........*/ 
    $.get('/divorce/suns/'+id,function(result){
      for (i in result){
        $('#family_table').append("<tr><td class=text-center>"+result[i].Arabic_Firstname+" "+result[i].Arabic_Fathername+" "+result[i].Arabic_Grandfathername+" "+result[i].Arabic_Familyname+"</td><td class=text-center>"+new Date(result[i].Birth_Date).getFullYear()+'/'+new Date(result[i].Birth_Date).getMonth()+'/'+new Date(result[i].Birth_Date).getDate()+"</td><td class=text-center>"+result[i].Arabic_Motherfirstname+" "+result[i].Arabic_Motherfathername+" "+result[i].Arabic_Mothergrandfathername+" "+result[i].Arabic_Motherfamilyname+"</td><td class=text-center><p data-placement=\"top\" data-toggle=\"tooltip\" title=\"أختار\"> \
        <input id=\"family_come_from\" type=\"checkbox\" name=\"family_come_from\" class=\"form-control\"/> \
        </p></td></tr>");
      }  
    });
  });
  /*_________________________*/


});    