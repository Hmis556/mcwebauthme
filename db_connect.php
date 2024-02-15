<?php

// 配置数据库连接参数
$servername = "localhost";
$username = "your";
$password = "your key";
$dbname = "your";

// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}
?>
