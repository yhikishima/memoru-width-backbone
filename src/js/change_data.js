//delete_data.js
(function(){
  if(localStorage.getItem('ip')){
    var ipJson = JSON.parse(localStorage.getItem('ip'));
    var i = ipJson['i'];
  }
  var randomNumber = Math.floor(Math.random()*100000000);
  var memoCheckFlag = false;
  var changeImportantFlag = false;
  var importantCheckDom;
  var timeString;
  var deleteDom;
  var changeDataObj = {};
  var changeDataJson;
  var changeMemoContent;
  var changeId;
  var changeIdObj;
  var textMemo;
  var correctionArea;
  var textCorrection;

  var getChangeObjects = function(obj){
    changeDomId = obj.closest('li').attr('id');
    changeLsId = changeDomId.replace('id','');
    changeIdObj = document.getElementById(changeDomId);
    textMemo = changeIdObj.getElementsByClassName('textMemo')[0];
    correctionArea = changeIdObj.getElementsByClassName('correctionArea')[0];
    textCorrection = changeIdObj.getElementsByClassName('textCorrection')[0];
    importantCheckDom = changeIdObj.getElementsByTagName('input')[0];
    timeString = changeIdObj.getElementsByTagName('time')[0].innerHTML;
    deleteDom = changeIdObj.getElementsByClassName('jsDelete')[0];

    return;
  }

  var memoContentCheck = function(text){
    changeMemoContent = text;
    if(changeMemoContent === '' || changeMemoContent === null){
      alert('メモを入力していません。');
      return false;
    }
    changeMemoContent = (changeMemoContent.replace(/</g, '＜'));
    changeMemoContent = (changeMemoContent.replace(/>/g, '＞'));
    changeMemoContent = (changeMemoContent.replace(/\'/g, '’'));
    changeMemoContent = (changeMemoContent.replace(/\"/g, '”'));

    memoCheckFlag = true;

    return [memoCheckFlag, changeMemoContent];
  }

  var importantCheck = function(){
    if(importantCheckDom.checked){
      changeImportantFlag = true;
    }else{
      changeImportantFlag = false;
    }
  }

  $('#memoDisplayArea').on('click','li .textMemo',function(){
    getChangeObjects($(this));

    textMemo.classList.add('hide');
    correctionArea.classList.remove('hide');
    deleteDom.classList.add('hide');
    textCorrection.focus();
  });

  $('#memoDisplayArea').on('click','li .btnSubmit',function(){
    getChangeObjects($(this));

    memoContentCheck(textCorrection.value);

    if(!memoCheckFlag) return;

    importantCheck();

    changeDataObj = {
      importantFlag : changeImportantFlag,
      memoData : changeMemoContent,
      date : timeString.split(']')[1]
    }
    changeDataJson = JSON.stringify(changeDataObj);
    localStorage.setItem(changeLsId, changeDataJson);

    if(changeImportantFlag){
      changeIdObj.classList.add('importantMemo');
    }else{
      changeIdObj.classList.remove('importantMemo');
    }

    if(changeMemoContent.indexOf('\n')){
      changeMemoContent = changeMemoContent.replace(/\n/g,'<br>');
    }
    textMemo.innerHTML = changeMemoContent;

    textMemo.classList.remove('hide');
    correctionArea.classList.add('hide');
    deleteDom.classList.remove('hide');

    if(!localStorage.getItem('ip')){
      return;
    }
    //ipがある場合はデータベースの更新を行う

  });

  // $.ajax({
  //   type: "POST",
  //   url: "delete_data.php?" + randomNumber,
  //   data: {request : i + '|' + p},
  //   success: function(data, dataType){
  //     //PHPから返ってきたデータの中からmemoLengthをローカルストレージに保存する。
  //     recieveData = JSON.parse(data);
  //     dataObjKeys = Object.keys(recieveData);
  //     localStorage.setItem('memoLength', recieveData.memoLength);

  //     for(var i = 0,I = dataObjKeys.length; i < I; i++){
  //       if(Object.keys(recieveData)[i] !== 'p' && Object.keys(recieveData)[i] !== 'memoLength'){
  //         var appendMemoList = {};

  //         appendMemoList = document.createElement('li');
  //         appendMemoList.id = 'id' + recieveData[i];
  //         if(recieveData[dataObjKeys[i]].importantFlag === true){
  //           appendMemoList.classList.add('importantMemo');
  //         }else{
  //           appendMemoList.classList.remove('importantMemo');
  //         }
  //         appendMemoList.innerHTML = '<p class="text" title="メモ編集したい場合はここをクリック！">' + recieveData[dataObjKeys[i]].memoData + '</p><textarea class="textCorrection hide">' + recieveData[dataObjKeys[i]].memoData + '</textarea><time>' + recieveData[dataObjKeys[i]].date + '</time><i class="iconDelete jsDelete"></i>';

  //         memoDisplayArea.insertBefore(appendMemoList,memoDisplayArea.firstChild);
  //       }
  //     }
  //   },
  //   error: function(XMLHttpRequest, textStatus, errorThrown){
  //     //エラーメッセージの表示
  //     //alert('Error : ' + errorThrown);
  //     alert('メモデータとの通信に失敗しました。時間をおいて再度お試しください');
  //   }
  // });
})();
