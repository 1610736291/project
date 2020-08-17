<?php
require "conn.php";
if(isset($_POST['tel'])){
    $tel = $_POST['tel'];
    $result=$conn->query("select * from  userdata where tel = '$tel'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}
if(isset($_POST['submit'])){
    $tel = $_POST['tel'];
    $password = sha1($_POST['password']);
    $truename = $_POST['truename'];
    $idcard=$_POST['idcard'];
    $conn->query("insert userdata values(null,'$tel','$password','$truename','$idcard')");
    header('location:http://localhost/project/gulptest/dist/login.html');
}

