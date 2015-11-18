$(document).ready(function(){
  $('#inform_date, #divorce_date,#add_family_record_date').datetimepicker({
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
  $.fn.open_family = function(){
    $('#open_family').on('click', function(){
     var id = $(this).val();
      $.get('/divorce/father/'+id,function(result){
        $('#father_name').empty();
        $('#father_name').append("<h4 class='modal-title'>أسم الزوج :<input type = 'hidden' name='father_name' value="+result[0].Personal.Person_Id+"></input><input type = 'hidden' name='husband_family_Id' value="+id+"></input><label > "+result[0].Personal.Arabic_Firstname+" "+result[0].Personal.Arabic_Fathername+" "+result[0].Personal.Arabic_Grandfathername+" "+result[0].Personal.Arabic_Familyname+"</label></h4>");
      });
      $.get('/divorce/'+id,function(result){
        $('#waif_name').empty();      
        $('#waif_name').append("<option value = '' style='colr:grey; display:none;'> أسم الزوجة </option>").selectpicker('refresh');
        for(i in result){
          $('#waif_name').append('<option value='+result[i].Personal.Person_Id+'">'+result[i].Personal.Arabic_Firstname+' '+result[i].Personal.Arabic_Fathername+' '+result[i].Personal.Arabic_Grandfathername+' '+result[i].Personal.Arabic_Familyname+'</option>').selectpicker('refresh');
        }
      });
    });  
  }; 
  /*----------------*/
  $('#search_button').on('click', function(){
    var id = $('#search_input').val();
    $.get('/divorce/search_family/'+id,function(result){
        $('#family_table').empty()
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
            '<td class="text-center">'+result.fid+'</td>'+
            '<td class="text-center">'+result.Registrynumber+'</td>'+
            '<td class="text-center">'+result.Recordnumber+'</td>'+
            '<td class="text-center">'+new Date(result.FamilyRecordDate).getFullYear()+'/'+new Date(result.FamilyRecordDate).getMonth()+'/'+new Date(result.FamilyRecordDate).getDate()+'</td>'+
            '<td class="text-center">'+result.Autogenerated_Id+'</td>'+
            '<td class="text-center">'+Is_Closed+'</td>'+
            '<td class="text-center">'+FamilyType+'</td>'+
            '<td class="text-center">'+result.office_name+'</td>'+
            '<td class="text-center">'+
            '<p data-placement="top" data-toggle="tooltip" title="أضافة فرد">'+
            '<button id="open_family" data-title="ADD" data-toggle="modal" data-target="#add" value="'+result.fid+'" class="btn btn-primary btn-xs edit_btn"><span class="glyphicon glyphicon-plus"></span></button>'+
            '</p>'+
            '<td class="text-center">'+
            '<p data-placement="top" data-toggle="tooltip" title="تعديل الواقعات">'+
            '<a href="/editdivorce/'+result.fid+'" id="open_divorce" data-title="ADD" data-toggle="modal" data-target="" value="'+result.fid+'" class="btn btn-primary btn-xs edit_btn"><span class="glyphicon glyphicon-edit"></span></button>'+
            '</p>'+
            '</td>');
      $.fn.open_family();   
     });
  });
  /*--------------------*/
  /*.........dath......*/
  $("#back").hide(0);
  $('#waif_name').on('change', function(){
    var id = $(this).val();
    $('#data1').empty();
    $('#family_chiled_table').empty();
    $.get('/divorce/Personal/'+id,function(result){
      if (result) {
        $("#back").show(100);
        $('#data1').append(''+new Date(result.Birth_Date).getFullYear()+'/'+new Date(result.Birth_Date).getMonth()+'/'+new Date(result.Birth_Date).getDate()+'');
      }else
      {
       $('#data1').empty();
       $("#data").hide(100);
      }
    });
    /*..........suns.child.......*/ 
    $.get('/divorce/suns/'+id,function(result){
      for (i in result){
        $('#family_chiled_table').append("<tr><td class=text-center>"+result[i].Arabic_Firstname+" "+result[i].Arabic_Fathername+" "+result[i].Arabic_Grandfathername+" "+result[i].Arabic_Familyname+"</td><td class=text-center>"+new Date(result[i].Birth_Date).getFullYear()+'/'+new Date(result[i].Birth_Date).getMonth()+'/'+new Date(result[i].Birth_Date).getDate()+"</td><td class=text-center>"+result[i].Arabic_Motherfirstname+" "+result[i].Arabic_Motherfathername+" "+result[i].Arabic_Mothergrandfathername+" "+result[i].Arabic_Motherfamilyname+"</td><td class=text-center><p data-placement=\"top\" data-toggle=\"tooltip\" title=\"أختار\"> \
        <input id=\"family_come_from\" type=\"checkbox\" name=\"son[]\" class=\"form-control\" value='"+result[i].id+"'/> \
        </p></td></tr>");
      }  
    });
  });
  /*_________________________*/
  $("#tabtow").hide(0);
  $("#child").hide(0);
  $('body').on('change', '#wife_bt_family', function(){
    var id = $(this).val();
    if(id == 2){
      $("#tabtow").show(100);
      $("#child").show(100);
    }else if (id =1){
      $("#tabtow").hide(0);
      $("#child").hide(100);
    }
  });
  /*________________________________________________________*/
  $('body').on('click','#edit_divorse_btn', function(){
      var id = $(this).val();
    $.get('/divorce/divorce_data/'+id,function(result){
      $('#id_divorce').append('<input type="hidden" name="id" value = "'+ result.divorce[0].id +'" ></>');
      $('#divorce_place').val(result.divorce[0].divorce_place);
      $('#divorce_date').val(new Date(result.divorce[0].divorce_date).getFullYear() +'/'+ new Date(result.divorce[0].divorce_date).getMonth() +'/'+ new Date(result.divorce[0].divorce_date).getDate());
      $('#contract_divorce_number').val(result.divorce[0].contract_number);
      $('#record_divorce_number').val(result.divorce[0].record_divorce_nu);
      $('#inform_date').val(new Date(result.divorce[0].inform_date).getFullYear() +'/'+ new Date(result.divorce[0].inform_date).getMonth() +'/'+ new Date(result.divorce[0].inform_date).getDate());
      // $('#Offices').val(result.offic.);
      if (result.divorce[0].divorce_type == 1)
      {
        var x ="طﻻق محكمة";
        $('#divorce_type').selectpicker('val',1);
      }else{
        var y = "طﻻق مؤذون";
        $('#divorce_type').selectpicker('val',2);
      }
    });
  });    
});    