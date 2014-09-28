//check_page-load.js
(function(){

  var memoDisplayArea = document.getElementById('memoDisplayArea');
  if(!localStorage.getItem('memoLength') || localStorage.getItem('memoLength') === '-Infinity' || localStorage.getItem('memoLength') === -Infinity || localStorage.getItem('memoLength') === 'NaN'){
    localStorage.memoLength = 0;
    var insertObj = {
      importantFlag : true,
      memoData : "ようこそ【MemoRu】へ！\n[+メモる]でメモを作成してみましょう。\n*このサービスではあなたのローカル環境にデータを保存していますので、あなた以外の方が見ることはできません。",
      date : "2014/3/2&nbsp00:00"
    }
    insertObj = JSON.stringify(insertObj);
    localStorage.setItem(0, insertObj);
  }

  var appendMemo = function(){
    var memoDataObj = {};
    var dataKey = 0;
    var dataNullFlag = false;
    var keysArr = [];
    var memoLengthFlag = false;
    for(var i = 0,I = localStorage.length; i < I; i++){
      if(localStorage.key(i) !== 'ip' && localStorage.key(i) !== 'memoLength'){
        keysArr.push(Number(localStorage.key(i)));
      }
    }
    keysArr = keysArr.sort(function(a,b){
      if( a < b ) return 1;
      if( a > b ) return -1;
      return 0;
    });
    if(localStorage.memoLength != 0){
      localStorage.memoLength = Math.max.apply(null, keysArr);
    }

    for(var i = 0,I = keysArr.length; i < I; i++){
        var appendMemoList = {};
        var memoDataObj = JSON.parse(localStorage.getItem(keysArr[i]));
        var dataKey = keysArr[i];
        var checkedString = '';

        if(memoDataObj === null){
          memoDataObj = JSON.parse(localStorage.getItem(keysArr[i]));
          dataKey = keysArr[i];
          dataNullFlag = true;
        }

        //alert(JSON.stringify(memoDataObj));

        if(memoDataObj.memoData.indexOf('\n')){
          var adjustMemoData = memoDataObj.memoData.replace(/\n/g,'<br>');
        }

        appendMemoList = document.createElement('li');
        appendMemoList.id = 'id' + dataKey;
        if(memoDataObj.importantFlag === true){
          appendMemoList.classList.add('importantMemo');
          checkedString = 'checked';
        }else{
          appendMemoList.classList.remove('importantMemo');
        }
        appendMemoList.innerHTML = '<p class="textMemo" title="メモ編集したい場合はここをクリック！">' + adjustMemoData + '</p><div class="correctionArea hide"><textarea class="textCorrection">' + memoDataObj.memoData + '</textarea><div class="inputArea"><div class="checkCell"><label class="checkInput"><input type="checkbox" ' + checkedString + '><b>重要</b></label></div><div class="btnCell"><button class="btnSubmit">メモり直す！</button></div></div></div><time>[No' + dataKey + ']' + memoDataObj.date + '</time><i class="iconDelete jsDelete"></i>';

        if(dataNullFlag === true){
          memoDisplayArea.insertBefore(appendMemoList,memoDisplayArea.firstChild);
          dataNullFlag = false;
        }else{
          memoDisplayArea.appendChild(appendMemoList);
        }
      //}
    }
  }

  if(localStorage.getItem('ip')){
    console.log('ip is exist in LocalStorage.');
    //idとpassがローカルストレージにセットされている場合、
    //サーバー上のjsonからmemoデータを取得して、localStorageに上書き
    var ipJson = JSON.parse(localStorage.getItem('ip'));
    var i = ipJson['i'];
    var p = ipJson['p'];
    var randomNumber = Math.floor(Math.random()*100000000);
    var recieveData  = {};
    var dataObjKeys;

    var getData = function(){
      $.ajax({
        type: "POST",
        url: "check_page-load.php?" + randomNumber,
        data: {request : i + '|' + p},
        success: function(data, dataType){
          //PHPから返ってきたデータの中からmemoLengthをローカルストレージに保存する。
          recieveData = JSON.parse(data);
          dataObjKeys = Object.keys(recieveData);
          localStorage.setItem('memoLength', recieveData.memoLength);

          for(var i = 0,I = dataObjKeys.length; i < I; i++){
            if(Object.keys(recieveData)[i] !== 'p'){
              localStorage.setItem(Object.keys(recieveData)[i], JSON.stringify(recieveData[dataObjKeys[i]]));
            }
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          //エラーメッセージの表示
          //alert('Error : ' + errorThrown);
          alert('メモデータとの通信に失敗しました。時間をおいて再度お試しください');
        }
      });
    }
    getData();
  }
  appendMemo();
})();
