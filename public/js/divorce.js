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
  $("#tabtow").hide(0);
  $('body').on('change', '#wife_bt_family', function(){
    var id = $(this).val();
    if(id == 2){
      $("#tabtow").show(100);
    }else if (id =1){
      $("#tabtow").hide(0);
    }
  });
  /*........Branches........*/
  /*........................*/
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
  /*---------------*/
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
  $.fn.open_family = function(){
    $('#open_family').on('click', function(){
     var id = $(this).val();
      $.get('/divorce/'+id,function(result){
      $('#waif_name').empty();
      $('#father_name').empty();

      $('#father_name').append("<h4 class='modal-title'>أسم الزوج :<input type = 'hidden' name='father_name' value="+result.fathers[0][0].Person_Id+"></input><label > "+result.fathers[0][0].Arabic_Firstname+" "+result.fathers[0][0].Arabic_Fathername+" "+result.fathers[0][0].Arabic_Grandfathername+" "+result.fathers[0][0].Arabic_Familyname+"</label></h4>");
      $('#waif_name').append("<option value = '' style='colr:grey; display:none;'> أسم الزوجة </option>").selectpicker('refresh');
        for(i in result.wifes){
          $('#waif_name').append('<option value='+result.wifes[0][i].Person_Id+'">'+result.wifes[0][i].Arabic_Firstname+' '+result.wifes[0][i].Arabic_Fathername+' '+result.wifes[0][i].Arabic_Grandfathername+' '+result.wifes[0][i].Arabic_Familyname+'</option>').selectpicker('refresh');
        }
      });
    });
  };  
  /*----------------*/
  $('#search_button').on('click', function(){
    var id = $('#search_input').val();
    $.get('/divorce/search_family/'+id,function(result){
        $('#family_table').empty()
        // $('#waif_name').append("<option value = '' style='colr:grey; display:none;'> أسم الزوجة</option>").selectpicker('refresh');
        if (result.Is_Closed == 1){
          var Is_Closed = "نشطة";
        }
        else if (result.Is_Closed == 2){
          var Is_Closed = "غير نشطة";
        }
        if (result.FamilyType==1){
          var FamilyType = "ليبية";
        }
        else if (result.FamilyType==2){
          var FamilyType = "مؤقته";
        }
        else if (result.FamilyType==3){
          var FamilyType = "اجانب";
        }
        $('#family_table').append('<tr>'+
            '<td class="text-center">'+result.id+'</td>'+
            '<td class="text-center">'+result.Registrynumber+'</td>'+
            '<td class="text-center">'+result.Recordnumber+'</td>'+
            '<td class="text-center">'+new Date(result.FamilyRecordDate).getFullYear()+'/'+new Date(result.FamilyRecordDate).getMonth()+'/'+new Date(result.FamilyRecordDate).getDate()+'</td>'+
            '<td class="text-center">'+result.Autogenerated_Id+'</td>'+
            '<td class="text-center">'+Is_Closed+'</td>'+
            '<td class="text-center">'+FamilyType+'</td>'+
            '<td class="text-center">'+result.office_name+'</td>'+
            '<td class="text-center">'+
            '<p data-placement="top" data-toggle="tooltip" title="أضافة فرد">'+
            '<button id="open_family" data-title="ADD" data-toggle="modal" data-target="#add" value="'+result.id+'" class="btn btn-primary btn-xs edit_btn"><span class="glyphicon glyphicon-plus"></span></button>'+
            '</p>'+
            '</td>');
      $.fn.open_family();   
     });
  });
  /*--------------------*/
  /*.........dath......*/
  $('#waif_name').on('change', function(){
    var id = $(this).val();
    $('#data').empty();
    $('#family_chiled_table').empty();
    $.get('/divorce/Personal/'+id,function(result){
      $('#data').append('<label class="form-control">'+new Date(result.Birth_Date).getFullYear()+'/'+new Date(result.Birth_Date).getMonth()+'/'+new Date(result.Birth_Date).getDate()+'</label>');
    });
  /*..........suns........*/ 
    $.get('/divorce/suns/'+id,function(result){
      console.log("suns");
      for (i in result){

        $('#family_chiled_table').append("<tr><td class=text-center>"+result[i].Arabic_Firstname+" "+result[i].Arabic_Fathername+" "+result[i].Arabic_Grandfathername+" "+result[i].Arabic_Familyname+"</td><td class=text-center>"+new Date(result[i].Birth_Date).getFullYear()+'/'+new Date(result[i].Birth_Date).getMonth()+'/'+new Date(result[i].Birth_Date).getDate()+"</td><td class=text-center>"+result[i].Arabic_Motherfirstname+" "+result[i].Arabic_Motherfathername+" "+result[i].Arabic_Mothergrandfathername+" "+result[i].Arabic_Motherfamilyname+"</td><td class=text-center><p data-placement=\"top\" data-toggle=\"tooltip\" title=\"أختار\"> \
        <input id=\"family_come_from\" type=\"checkbox\" name=\"son[]\" class=\"form-control\" value='"+result[i].id+"'/> \
        </p></td></tr>");
      }  
    });
  });
  /*_________________________*/


});    