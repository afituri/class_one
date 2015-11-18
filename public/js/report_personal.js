$(document).ready(function(){
	 $('body').on('click', '#birth', function (e) {
	 	var path=document.URL;
        var familyid=path.split('/').pop();
        var id =$(this).val();
        $.post('/set_data/'+$(this).val(),{familyid:familyid},function(result){ 
   		 window.location.href='/birthCertificate/';
   		});
	 });

	 $('body').on('click', '#death', function (e) {
	 	var path=document.URL;
        var familyid=path.split('/').pop();
        var id =$(this).val();
        $.post('/set_data_death/'+$(this).val(),{familyid:familyid},function(result){ 
   		 window.location.href='/deathCertificate/';
   		}); 	
	 });


	 
});