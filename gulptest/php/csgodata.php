<?php
include "conn.php";
$result= $conn->query("select * from csgodata");
$arr=array();
for ($i=0;$i<$result->num_rows; $i++){
    $arr[$i]=$result->fetch_assoc();
}
echo json_encode($arr);//输出接口