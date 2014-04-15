/**
 * Collector:
 */
(function(exports){
  exports.collector = {"hello": "collector"};

  exports.collector.browser = (function(){
    var browser = {};
    browser.language = navigator.language || navigator.userLanguage || navigator.systemLanguage;
    browser.type = navigator.userAgent;
    return browser;
  })();

  return exports;
})(window.exports === undefined? this: exports);