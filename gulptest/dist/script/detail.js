"use strict";!function(n){var i=location.search.substring(1).split("=")[1],c=n(".pic img"),a=n(".title"),s=n(".price"),i=i||1;n.ajax({url:"http://10.31.152.13/project/gulptest/php/getsid.php",data:{sid:i},dataType:"json"}).done(function(i){c.attr("src",i.src),c.attr("sid",i.sid),a.html(i.title),s.html("￥"+i.price);var t=i.piclisturl.split(","),o="";n.each(t,function(i,t){o+='<span><img src="'+t+'"/></span>'}),n(".xiaotu").html(o),n(".xiaotu span").on("click",function(){var i=n(this).find("img").attr("src");c.attr("src",i)})}),n(".goodnum input").on("input",function(){var i;""!=n(this).val()&&(i=n(this).val(),/^\d+$/g.test(i)||n(this).val(1),0==n(this).val()&&n(this).val(1))});var t=Number(n(".goodnum .num").val());n(".goodnum .sub").on("click",function(){--t<1&&(t=1),n(".goodnum .num").val(t)}),n(".goodnum .add").on("click",function(){t+=1,n(".goodnum .num").val(t)});var o=[],e=[];n(".addcar").on("click",function(){var i,t=n(this).parents(".wrapper").find(".spic").attr("sid");e=cookie.get("cookiesid")&&cookie.get("cookienum")?(o=cookie.get("cookiesid").split(","),cookie.get("cookienum").split(",")):(o=[],[]),-1!=n.inArray(t,o)?(i=parseInt(e[n.inArray(t,o)])+parseInt(n(".num").val()),e[n.inArray(t,o)]=i):(o.push(t),cookie.set("cookiesid",o,10),e.push(n(".num").val())),cookie.set("cookienum",e,10),n(".shade").show()}),n(".hide").on("click",function(){n(".shade").hide()}),n(".goon").on("click",function(){n(".shade").hide()})}(jQuery);