//create_usr-id.js
(function(MEMORUJS){
  MEMORUJS.createUsrId = function(){
    //localStorage.clear();
    this.usrIdInput = document.getElementById('usrIdInput');
    this.passInput = document.getElementById('passInput');
    this.usrIdCreate = document.getElementById('usrIdCreate');
    this.inputCheck = 'failure';

    this.init();
  }

  var fn = MEMORUJS.createUsrId.prototype;

  //functions
  fn.init = function(){
    var self = this;

    this.usrIdCreate.addEventListener('click',function(){
      self.inputContentCheck();
      if(self.inputCheck === 'failure') return;

      console.log('inputの中身チェック問題なし');

      self.postId(self.usrIdInput.value + '|' + self.passInput.value);
    },false);
  }

  fn.inputContentCheck = function(){
    var idCheckFlag = true;
    var passCheckFlag = true;

    if(this.usrIdInput.value.match(/[^A-Za-z\s.-]+/)){
      alert('IDは半角英数字のみ入力可能です。');
      idCheckFlag = false;
    }else{
      idCheckFlag = true;
    }
    if(this.passInput.value.match(/[^A-Za-z\s.-]+/)){
      alert('パスワードは半角英数字のみ入力可能です。');
      passCheckFlag = false;
    }else{
      passCheckFlag = true;
    }
    if(idCheckFlag && passCheckFlag){
      this.inputCheck = 'success';
      return this.inputCheck;
    }else{
      this.inputCheck = 'failure';
    }
  }

  fn.postId = function(ip){
    var ip = {request : ip};
    var randomNumber = Math.floor(Math.random()*100000000);
    var self = this;

    $.ajax({
      type: "POST",
      url: "create_usr-id.php?" + randomNumber,
      data: ip,
      success: function(data, dataType){
        //PHPから返ってきたデータ
        console.log(data);

        //localstorageにid,passをキャッシュさせる
        var insertIp = {
          i : self.usrIdInput.value,
          p : self.passInput.value
        }
        localStorage.setItem('ip', JSON.stringify(insertIp));
        localStorage.setItem('memoLength', 0);

      },
      error: function(XMLHttpRequest, textStatus, errorThrown){
        //エラーメッセージの表示
        //alert('Error : ' + errorThrown);
        alert('メモデータとの通信に失敗しました。時間をおいてお試しください');
      }
    });
  return false;
  }
})(MEMORUJS || (MEMORUJS = {}));
