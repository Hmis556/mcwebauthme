<?php

session_start();
//人机验证
$captcha = isset($_POST['captcha']) ? $_POST['captcha'] : '';

if ($captcha == '') {
    die('验证码不能为空。');
}

if ($captcha != $_SESSION['captcha_code']) {
    die('验证码错误。');
}

echo '验证码正确。';

          session_start();
          if(isset($_SESSION["anti_bot_verified"])) {
              if($_SESSION["anti_bot_verified"]) {
                  echo "Verified";
              } else {
                  echo "Not verified";
              }
          }

// 引入数据库连接文件
require_once 'db_connect.php';
// 接收表单数据
$username = $_POST['username'];
$realname = $_POST['realname'];
$password = md5($_POST['password']); // 使用MD5加密密码
$invite_code = $_POST['invite_code'];
$email = $_POST['email'];

// 检查邀请码是否正确
$stmt = $conn->prepare("SELECT COUNT(*) as count FROM invite_codes WHERE invite_code = ?");
$stmt->bind_param('s', $invite_code);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if ($row['count'] == 0) {
    die('邀请码无效.');
}

// 从数据库中删除邀请码
$stmt = $conn->prepare("DELETE FROM invite_codes WHERE invite_code = ?");
$stmt->bind_param('s', $invite_code);
$stmt->execute();

// 防止SQL注入
$username = mysqli_real_escape_string($conn, $username);
$realname = mysqli_real_escape_string($conn, $realname);
$password = mysqli_real_escape_string($conn, $password);

// 插入数据到数据库
$sql = "INSERT INTO users (username, realname, password, email, invite_code) VALUES ('$username', '$realname', '$password','$email', '$invite_code')";
$result = $conn->query($sql);

if ($result) {
    header("Location: login.html"); // 注册成功后，重定向到登录页面
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>
