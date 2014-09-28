//modal.js
(function(MEMORUJS){
  MEMORUJS.modal = function(){
    this.triggerId = document.getElementById('modalTrigger');
    this.modalId = document.getElementById('modal');
    this.modalInsertMemoId = document.getElementById('modalInsertMemo');
    this.pcCloseTriggerId = document.getElementById('pcModalClose');
    this.modalBtnSubmit = document.getElementById('modalBtnSubmit');
    this.jsContentClass = document.getElementsByClassName('jsContent');
    this.headerId = document.getElementById('header');

    this.init();
  }

  var fn = MEMORUJS.modal.prototype;

  //functions
  fn.init = function(){
    var self = this;

    this.triggerId.addEventListener('click',function(){
      self.modalControl(this);
    },false);

    this.pcCloseTriggerId.addEventListener('click',function(){
      self.closeModal(self.triggerId);
    },false);
  }

  fn.modalControl = function(obj){
    if(obj.classList.contains('closeModal')){
      this.closeModal(obj);
      return;
    }
    this.openModal(obj);
  }

  fn.closeModal = function(obj){
    this.modalId.classList.add('hide');
    obj.classList.remove('closeModal');
    this.triggerId.innerHTML = '<i class="iconPlus"></i><b>メモる</b>';
    this.ios7BugSupportClose();
  }

  fn.openModal = function(obj){
    this.modalId.classList.remove('hide');
    obj.classList.add('closeModal');
    this.triggerId.innerHTML = '<i class="iconMinus"></i><b class="close">閉じる</b>';
    this.modalInsertMemoId.focus();
    this.ios7BugSupportOpen();
  }

  fn.ios7BugSupportOpen = function(){
    if(MEMORUJS.uaCheck() ==='iPhone' || MEMORUJS.uaCheck() ==='iPad' || MEMORUJS.uaCheck() ==='iPod'){
      for(var i = 0,I = this.jsContentClass.length; i < I; i++){
        this.jsContentClass[i].classList.add('hide');
      }
      this.headerId.classList.add('absolute');
      this.modalId.classList.add('absolute');
    }
  }

  fn.ios7BugSupportClose = function(){
    if(MEMORUJS.uaCheck() ==='iPhone' || MEMORUJS.uaCheck() ==='iPad' || MEMORUJS.uaCheck() ==='iPod'){
      for(var i = 0,I = this.jsContentClass.length; i < I; i++){
        this.jsContentClass[i].classList.remove('hide');
      }
      this.headerId.classList.remove('absolute');
      this.modalId.classList.remove('absolute');
    }
  }

})(MEMORUJS || (MEMORUJS = {}));
