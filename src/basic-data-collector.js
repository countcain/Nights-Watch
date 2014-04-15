/**
 * Collector:
 */
(function(exports){
  exports.collector = {"hello": "collector"};

  exports.collector.browser = (function(){
    var browser = {};
    browser.language = navigator.language || navigator.userLanguage || navigator.systemLanguage;
    browser.type = (function(){
      var ua = navigator.userAgent, tem,
          M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
      if(/trident/i.test(M[1])){
        tem =  /\brv[ :]+(\d+(\.\d+)?)/g.exec(ua) || [];
        return 'IE '+ (tem[1] || '');
      }
      M = M[2]? [M[1], M[2]]:[navigator.appName, navigator.appVersion, '-?'];
      if((tem = ua.match(/version\/([\.\d]+)/i)) !== null) M[2] = tem[1];
      return M.join(' ');
    })();
    return browser;
  })();

  return exports;
})(window.exports === undefined? this: exports);