<!DOCTYPE html>
<?php
if(isset($_POST['score'])){
    $score = $_POST['score'];
    $gamemode = $_POST['gamemode'];
}else{
    echo"<h1>不正な操作</h1>";
    echo"<p>不正な操作・要求です。ゲーム未プレイ、もしくはセッションの期限が切れた可能性があります。</p>";
    echo"<a href='index.html' target='_blank', rel='noopener noreferrer'>ゲームに戻る</a>";
    exit;
}

$link = mysqli_connect($host,$username,$passwd,$dbname,$port,$socket);
if(mysqli_connect_errno()){
    die("DataBase Access Failed");
}else{
    echo("DataBase Access success");
}

if(isset($_POST['send'])){
    echo "PHP send success";
    $score = $_POST['score'];
    $gamemode = $_POST['gamemode'];
    $name = $_POST['name'];
    $_POST = array();
    $date = date('Y-m-d H:i:s');
    $query = "INSERT INTO test(name, gamemode, score, date) VALUES ('$name', '$gamemode', '$score', '$date');";
    if(mysqli_query($link, $query)){
        echo "Data Insert Success";
    }else{
        echo "Data Insert Failed";
    }
    mysqli_close($link);
    echo "<script type='text/javascript'>window.location.replace('index.html');</script>";
}

?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>

<h1>成績登録画面</h1>
<p>こちらはHit and Blowの成績結果をランキングに登録する画面です.</p>
<p>名前はローマ字で３文字以内で登録してください.</p>

<h2>あなたの試合結果</h2>
<p>Hit and Blow桁数：<?php echo $gamemode;?>桁</p>
<p>記録：<?php echo $score;?>秒</p>

<form action="test.php" method="POST" >
    NAME: <input type="text" name="name" value="" maxlength="3" pattern="^[A-Z]+$" required>
    <input type="hidden" name="gamemode" value="<?php echo $gamemode;?>">
    <input type="hidden" name="score" value="<?php echo $score;?>">
    <input type="submit" name="send" value="送信">
</form> 


</body>
</html>