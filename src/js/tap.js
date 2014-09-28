//tap.js
(function(MEMORUJS){
  MEMORUJS.tap = function(){
    this.tapClass = document.getElementsByClassName('jsTap');

    this.init();
  }

  var fn = MEMORUJS.tap.prototype;

  //functions
  fn.init = function(){
    var self = this;
    for(var i = 0 ,I = this.tapClass.length; i < I; i++){
      (function(l) {
        self.tapClass[l].addEventListener('touchstart', function() {
          self.addTapped(l);
        },false);
      })(i);

      (function(l) {
        self.tapClass[l].addEventListener('touchmove', function() {
          self.removeTapped(l);
        },false);
      })(i);

      (function(l) {
        self.tapClass[l].addEventListener('touchend', function() {
          self.removeTapped(l);
        },false);
      })(i);
    }
  };

  fn.addTapped = function(num){
      this.tapClass[num].classList.add('tapped');
  };

  fn.removeTapped = function(num){
      this.tapClass[num].classList.remove('tapped');
  };

})(MEMORUJS || (MEMORUJS = {}));
