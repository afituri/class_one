var models = require("../models");
exports.helpers_mgr = {
  date_later : function(date,cb){
    var date_later='';
    var aname=['','واحد','اثنان','ثلاثة','اربعة','خمسة','ستة','سبعة','ثمانية','تسعة','عشرة','أحد عشر','اثنا عشر'];
    var aname10=['','عشر','عشرون','ثلاثون','اربعون','خمسون','ستون','سبعون','ثمانون','تسعون'];
    var aname100=['','مئة','مئتان','ثلثمائة','اربعمائة','خمسمائة','ستمائة','سبعمائة','ثمانمائة','تسعمائة'];
    var aname1000=['','الف','الفان'];
    var month=['','يناير','فبراير','مارس','ابريل','مايو','يونيو','يوليو','اغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    if(date.getDate()>12){
      var d = date.getDate()%10;
      var w = Math.floor(date.getDate()/10);
      date_later+=aname[d]+''+aname10[w];
    }else{
      date_later+=aname[date.getDate()];
    }
    date_later+=' من '+month[date.getMonth()+1];
    var dd = Math.floor(date.getFullYear()/100);
    var df = Math.floor(date.getFullYear()%100);
    date_later+='سنة '+aname1000[dd/10]+' '+aname100[dd%10];
    if(df>12){
      var d = df%10;
      var w = Math.floor(df/10);
      date_later+=' و' +aname[d]+''+aname10[w];  
    }else{
      date_later+=aname[df];
    }
    cb(date_later);  
  },
};

