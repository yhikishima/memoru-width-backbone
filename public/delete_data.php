<?php
header("Content-type: text/plain; charset=UTF-8");
if (isset($_POST['request'])){

  $ip = explode('|',$_POST['request']);
  $id = $ip[0];
  $pass = $ip[1];
  $file_name = 'data/'.$id.'.json';


  if (file_exists($file_name)) {
    //echo 'memoData-is-exist.';
    $json = file_get_contents($file_name, true);
    $arr = json_decode($json);

    $jsonPass = $arr->{'p'};

    if($pass == $jsonPass){
      //echo 'pass-certification-ok.';
      echo $json;
    }else{
      echo 'pass-certification-error.';
    }

  }else{
    echo 'memoData-is-not-exist.';
  }

}
else{
  echo 'id-pass-check-correspondence-is-error.';
}
?>