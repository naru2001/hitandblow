<!DOCTYPE html>
<?php
    session_start();
    if(isset($_SESSION['status'])){
        echo"<div class='container'><div class='center-block'><div class='text-center'><h1>ランキング登録完了!</h1>";
        echo"<p>無事. ランキングへの登録が完了しました.</P>";
        echo"<p>このままこのページを閉じるか, ランキング結果表示を閲覧したい場合には下のボタンを押下してください.</p>";
	echo"<form action='ranking.php' method='POST'>
<input type='submit' name='fly' value='ランキングサイトへ' class='btn btn-light btn-lg'></div></div></div>
";
        session_destroy();
    }else{
        echo"<div class='container'><div class='center-block'><div class='text-center'><h1>不正な操作です</h1>";
        echo"<p>予期されない要求, 操作が発生しました.</p>";
        echo"<a href='../hitandblow/index.html' target='_blank', rel='noopener noreferrer'>ゲームに戻る</a></div></div></div>";
        session_destroy();
    }
?>
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous">
  </script>
  <title>結果送信確認画面</title>
</head>

<body>
  </form>
</body>

</html>