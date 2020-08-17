<?php
require "conn.php";
//检测手机号码和密码
if(isset($_POST['tel'])&&isset($_POST['password'])){
    $tel = $_POST['tel'];
    $password = $_POST['password'];
    $result=$conn->query("select * from userdata where tel = '$tel' and password = '$password'");
    
    if($result->fetch_assoc()){//登录成功
        echo true;//1
    }else{//登录失败
        echo false;//空
    }
}