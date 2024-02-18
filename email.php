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
 
 $Email = $_POST['email'];

          if(isset($_SESSION["anti_bot_verified"])) {
              if($_SESSION["anti_bot_verified"]) {
                  echo "Verified";
              } else {
                  echo "Not verified";
              }
          }


//生成6位随机验证码
function codestr(){
    $arr=array_merge(range('a','b'),range('A','B'),range('0','9'));
    shuffle($arr);
    $arr=array_flip($arr);
    $arr=array_rand($arr,6);
    $res='';
    foreach ($arr as $v){
        $res.=$v;
}
return $res;
}
$_SESSION['captcha123']=codestr();
//echo $_SESSION['captcha123']

 
//[*邮件发送逻辑处理过程*系统核心配置文件*]
 
 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
 
//调用PHPMailer组件，此处是你自己的目录，需要改写。
require './PhpEmail/PHPMailer-6.9.1/src/Exception.php';
require './PhpEmail/PHPMailer-6.9.1/src/PHPMailer.php';
require './PhpEmail/PHPMailer-6.9.1/src/SMTP.php';
 
$mail = new PHPMailer(true);       // Passing `true` enables exceptions  mgysyzklvjxvdghd
try {
    //服务器配置
    $mail->CharSet ="UTF-8";                     //设定邮件编码
    $mail->SMTPDebug = 0;                        // 调试模式输出
    $mail->isSMTP();                             // 使用SMTP
    $mail->Host = 'smtphz.qiye.163.com';            // SMTP服务器
    $mail->SMTPAuth = true;                      // 允许 SMTP 认证
    $mail->Username = '333@qq.cc';              // SMTP 用户名  即邮箱的用户名
    $mail->Password = 'key';        // SMTP 密码  部分邮箱是授权码(例如163邮箱)
    $mail->SMTPSecure = 'ssl';                    // 允许 TLS 或者ssl协议
    $mail->Port = 465;                            // 服务器端口 25 或者465 具体要看邮箱服务器支持
 
    $mail->setFrom('333@qq.ca', '33');  //发件人（以QQ邮箱为例）
     
    $mail->addAddress($Email, 'Joe');  // 收件人（$Email可以为变量传值，也可为固定值）
    //$mail->addAddress('ellen@example.com');  // 可添加多个收件人
    $mail->addReplyTo('333@qq.ca', 'info'); //回复的时候回复给哪个邮箱 建议和发件人一致
    //$mail->addCC('cc@example.com');                    //抄送
    //$mail->addBCC('bcc@example.com');                    //密送
 
    //发送附件
    // $mail->addAttachment('../xy.zip');         // 添加附件
    // $mail->addAttachment('../thumb-1.jpg', 'new.jpg');    // 发送附件并且重命名
    $yanzhen = $_SESSION['captcha123'];//codestr();  //此处为调用随机验证码函数（按照自己实际函数名改写）
    //echo $yanzhen;
    //Content
    $mail->isHTML(true);                                  // 是否以HTML文档格式发送  发送后客户端可直接显示对应HTML内容
    $mail->Subject = '******身份登录验证';
    $mail->Body    = '<h1>欢迎使用******</h1><h3>您的身份验证码是：<span>'.$yanzhen.'</span></h3>' . date('Y-m-d H:i:s');
    $mail->AltBody = '欢迎使用********,您的身份验证码是：'.$yanzhen . date('Y-m-d H:i:s');
 
    $mail->send();
    echo '验证邮件发送成功，请注意查收！';
} catch (Exception $e) {
    echo '邮件发送失败: ', $mail->ErrorInfo;
}
//邀请码提交
require_once 'db_connect.php'; //数据库导入
// 接收表单数据
$username = $_POST['username'];
$Email = $_POST['email'];
$invite_code = $yanzhen;

// 防止SQL注入
$username = mysqli_real_escape_string($conn, $username);
$realname = mysqli_real_escape_string($conn, $email);
$password = mysqli_real_escape_string($conn, $password);

//检验邮箱是否唯一
$stmt = $conn->prepare("SELECT COUNT(*) as count FROM invite_codes WHERE email = ?");
$stmt->bind_param('s', $Email);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if ($row['count'] == 0) {
    die('新用户.');
}

$stmt = $conn->prepare("DELETE FROM invite_codes WHERE email = ?");
$stmt->bind_param('s', $Email);
$stmt->execute();


// 插入数据到数据库
$sql = "INSERT INTO invite_codes (invite_code, username, email) VALUES ('$invite_code', '$username', '$Email')";
$result = $conn->query($sql);

if ($result) {
    header("Location: register.html"); // 申请成功后，重定向到注册页面
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();



?>
