<!DOCTYPE html>
<?php
if(isset($_POST['score'])){
    $score = $_POST['score'];
    $gamemode = $_POST['gamemode'];
    $date = $_POST['date'];
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
    //echo("DataBase Access success");
}

if(isset($_POST['send'])){
    echo "PHP send success";
    $score = $_POST['score'];
    $gamemode = $_POST['gamemode'];
    $name = $_POST['name'];
    $date = $_POST['date'];
    $_POST = array();
    $test_q = "SELECT COUNT(*) AS a FROM ranking WHERE date = '$date' AND score = '$score'";
    $res = mysqli_query($link, $test_q);
    $row = mysqli_fetch_assoc($res);
    echo ($row["a"]);
    if($row["a"]>0){
        echo "Already Data Insert";
        echo"<h1>不正な要求・操作</h1>";
        echo"<p>不正な要求・操作が発生しました. ランキングへ既に登録されています.</p>";
        exit;
    }else{
        echo "Data is Not Insert yet";
    }
    $query = "INSERT INTO ranking(name, gamemode, score, date) VALUES ('$name', '$gamemode', '$score', '$date');";
    if(mysqli_query($link, $query)){
        echo "Data Insert Success";
    }else{
        echo "Data Insert Failed";
        exit;
    }
    mysqli_close($link);
    session_start();
    $_SESSION['status'] = 1;
    echo "<script type='text/javascript'>window.location.replace('success.php');</script>";
}
?>
<html>

<head>
  <title>成績登録画面 Hit and Blow</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous">
  </script>
</head>

<body>

  <div class="container">
    <div class="center-block">
      <div class="text-center">
        <h1>成績登録画面<small class="text-muted">Hit and Blow</small></h1>
        <p>こちらはHit and Blowの成績結果をランキングに登録する画面です.</p>
        <p>名前はローマ字(大文字), ３文字以内で登録してください.</p>

        <h2>あなたの試合結果</h2>
        <p>Hit and Blow桁数：<?php echo $gamemode;?>桁</p>
        <p>記録：<?php echo $score;?>秒</p>
        <p>達成時刻：<?php echo $date;?></p>
        <div class="form-group">
          <form action="insert.php" method="POST">
            <label class="col-sm-2 control-label">
              <div class="row">
                NAME:
            </label><input type="text" name="name" value="" maxlength="3" pattern="^[A-Z]+$" required
              class="form-control mb-2" placeholder="RTA">
        </div>
        <input type="hidden" name="gamemode" value="<?php echo $gamemode;?>">
        <input type="hidden" name="score" value="<?php echo $score;?>">
        <input type="hidden" name="date" value="<?php echo $date;?>">
        <input type="submit" name="send" value="送信" class="btn btn-light btn-lg">
        </form>
      </div>
    </div>
  </div>
  </div>


</body>

</html>