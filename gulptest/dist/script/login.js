"use strict";var inputs=document.querySelectorAll(".login input");localStorage.getItem("tel")&&localStorage.getItem("password")&&(inputs[0].value=localStorage.getItem("tel"),inputs[1].value=localStorage.getItem("password"),inputs[2].checked=!0),inputs[3].onclick=function(){var e=new XMLHttpRequest;e.open("post","http://10.31.152.13/project/gulptest/php/login.php",!0),e.setRequestHeader("content-type","application/x-www-form-urlencoded"),e.send("tel="+inputs[0].value+"&password="+hex_sha1(inputs[1].value)),console.log($(".tel").value),e.onreadystatechange=function(){4===e.readyState&&(e.responseText?(inputs[2].checked?(window.localStorage.setItem("tel",inputs[0].value),window.localStorage.setItem("password",inputs[1].value)):(window.localStorage.removeItem("tel"),window.localStorage.removeItem("password")),alert("登录成功"),location.href="header.html"):(inputs[1].value="",alert("用户名或者密码错误")))}};