//ua_check.js
(function(global){
    var obj = global.MEMORUJS,
        ua = global.navigator.userAgent;
    obj.uaCheck = function(){
        if(ua.indexOf('Chrome') > 0 && ua.indexOf('Version') === -1){
            return 'Chrome';
        } else if(ua.indexOf('Android') > 0) {
            return 'Android';
        } else if(ua.indexOf('iPhone') > 0) {
            return 'iPhone';
        } else if(ua.indexOf('iPad') > 0) {
            return 'iPad';
        } else if(ua.indexOf('iPod') > 0) {
            return 'iPod';
        }
    }
})(this);
