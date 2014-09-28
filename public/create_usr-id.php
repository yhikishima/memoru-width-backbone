<?php
header("Content-type: text/plain; charset=UTF-8");
if (isset($_POST['request'])){

  $ip = explode('|',$_POST['request']);
  $id = $ip[0];
  $pass = $ip[1];
  $file_name = 'data/'.$id.'.json';

  if (file_exists($file_name)) {
    echo 'そのidは既に他のユーザーが使用しています。';
  }else{
    echo 'IDとパスワードのみjsonデータを保存させる';
    $passArr = array(
      'p' => $pass,
      'memoLength' => 0
    );

    touch ($file_name);
    $fp = fopen($file_name, 'a') or dir('メモデータが開けません');
    fwrite($fp, json_encode($passArr));
    fclose($fp);
  }

}
else{
  echo 'ID登録の通信に失敗しました。';
}
?>