<?php
include "conn.php";
$result= $conn->query("select * from dotadata");
$arr=array();
for ($i=0;$i<$result->num_rows; $i++){
    $arr[$i]=$result->fetch_assoc();
}
echo json_encode($arr);//输出接口