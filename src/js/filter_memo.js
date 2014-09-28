//filter_memo.js
(function(MEMORUJS){
  MEMORUJS.filterMemo = function(){
    this.filterParent = document.getElementById('filterTrigger');
    this.filterChild = this.filterParent.getElementsByTagName('li');
    this.displayMemoAllId = document.getElementById('displayMemoAll');
    this.displayMemoUsuallyId = document.getElementById('displayMemoUsually');
    this.displayMemoImportantId = document.getElementById('displayMemoImportant');
    this.memoSingle = document.getElementById('memoDisplayArea').getElementsByTagName('li');
    this.curFilter;

    this.init();
  }

  var fn = MEMORUJS.filterMemo.prototype;

  //functions
  fn.init = function(){
    var self = this;

    this.displayMemoAllId.addEventListener('click',function(){
      self.filterFunction(this);
    },false);

    this.displayMemoUsuallyId.addEventListener('click',function(){
      self.filterFunction(this);
    },false);

    this.displayMemoImportantId.addEventListener('click',function(){
      self.filterFunction(this);
    },false);
  };

  fn.filterFunction = function(obj){
    if(obj.classList.contains('cur')) return;

    for(var i = 0,I = this.filterChild.length; i < I; i++){
      this.filterChild[i].classList.remove('cur');
    }

    document.getElementById(obj.getAttribute('id')).classList.add('cur');

    if(obj.getAttribute('id') === 'displayMemoAll'){
      for(var i = 0,I = this.memoSingle.length; i < I; i++){
        this.memoSingle[i].classList.remove('hide');
      }
    }
    if(obj.getAttribute('id') === 'displayMemoUsually'){
      for(var i = 0,I = this.memoSingle.length; i < I; i++){
        if(this.memoSingle[i].classList.contains('importantMemo')){
          this.memoSingle[i].classList.add('hide');
        }else{
          this.memoSingle[i].classList.remove('hide');
        }
      }
    }
    if(obj.getAttribute('id') === 'displayMemoImportant'){
      for(var i = 0,I = this.memoSingle.length; i < I; i++){
        if(this.memoSingle[i].classList.contains('importantMemo')){
          this.memoSingle[i].classList.remove('hide');
        }else{
          this.memoSingle[i].classList.add('hide');
        }
      }
    }
  };

})(MEMORUJS || (MEMORUJS = {}));
