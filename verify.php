<?php
session_start();

header('Content-type: image/png');

$width = 100;
$height = 40;
$image = imagecreate($width, $height);
$bgColor = imagecolorallocate($image, 255, 255, 255);

$font = './tff/kurobara-gothic-heavy.ttf'; // 更改为你的字体文件路径
$fontSize = 20;

$code = '';
for ($i = 0; $i < 4; $i++) {
    $character = chr(rand(97, 122));
    $code .= $character;
    $textColor = imagecolorallocate($image, rand(0, 255), rand(0, 255), rand(0, 255));
    imagettftext($image, $fontSize, rand(-30, 30), 20 + $i * 20, 30, $textColor, $font, $character);
}

$_SESSION['captcha_code'] = $code;

imagepng($image);
imagedestroy($image);
