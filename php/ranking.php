<!DOCTYPE html>
<?php

$link = mysqli_connect($host,$username,$passwd,$dbname,$port,$socket);
if(mysqli_connect_errno()){
    die("DataBase Access Failed");
    exit;
}else{
    echo("DataBase Access success");
}

echo"<h1 class='text-center'>Hit and Blow Ranking site</h1>";

echo'<div class="container"><div class="row">
        <div class="col text-center">
        <form action="ranking.php" method="POST" >
        <button type="submit" class="btn btn-light w-25" name="3">3桁</button>
        <button type="submit" class="btn btn-light w-25" name="4">4桁</button>
        <button type="submit" class="btn btn-light w-25" name="5">5桁</button>
        </form></div></div>
        </div>';

if(isset($_POST['4'])){
    $sql = "SELECT * FROM ranking WHERE gamemode = 4 ORDER BY score;";
}else if(isset($_POST['5'])){
    $sql = "SELECT * FROM ranking WHERE gamemode = 5 ORDER BY score;";
}else{
    $sql = "SELECT * FROM ranking WHERE gamemode = 3 ORDER BY score;";
}

$_POST = array();

$res = mysqli_query($link, $sql);
echo"<div class='container'><div class='table-responsive'>";
echo"<table class='table table-striped'><thead><tr><th>RANK</th><th>NAME</th><th>SCORE</th><th>DATE</th></tr></thead><tbody>";
$i = 0; // ranking
while ($data = mysqli_fetch_array($res)) {
    $i++;
    echo '<tr><th scope="row">' .$i.'</th><td>'. $data['name'] . '</td><td>' . $data['score'] . 's</td><td>' . $data['date'] . "</td></tr>";
    if($i==30){
        break;
    }
}
echo"</tbody></table></div></div>";
mysqli_close($link);

?>
<html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous">
  </script>
  <title>Hit and Blow Ranking site</title>
</head>

<body>
</body>

</html>