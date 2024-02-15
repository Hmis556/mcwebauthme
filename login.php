<?php
// 引入数据库连接文件
require_once 'db_connect.php';
// 接收表单数据
$username = $_GET['username'];
$password = md5($_GET['password']);

$sql = "SELECT id, username, password FROM users WHERE username='$username' AND password='$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    header("Location: login_success.php");
} else {
    echo "登录失败，请检查您的用户名和密码。";
}

$conn->close();
?>