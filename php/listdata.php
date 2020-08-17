<?php
include "conn.php";//引入数据库连接。

$pagesize = 12; 

$result = $conn->query("select * from alldata"); 

$num = $result->num_rows; 

$pagenum = ceil($num / $pagesize); 



if (isset($_GET['page'])) {
    $pagevalue = $_GET['page'];
} else {
    $pagevalue = 1;
}



$page = ($pagevalue - 1) * $pagesize;

$res = $conn->query("select * from alldata limit $page,$pagesize");

$arr = array();
for ($i = 0; $i < $res->num_rows; $i++) {
    $arr[$i] = $res->fetch_assoc();
}
echo json_encode($arr);//输出接口
