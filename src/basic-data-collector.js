/**
 * Collector:
 */
(function(exports){
  exports.collector = {"hello": "collector"};

  exports.collector.browser = (function(){
    var browser = {};
    var info = platform.parse(navigator.userAgent);
    browser.language = navigator.language || navigator.userLanguage || navigator.systemLanguage;
    browser.platform = info.os.toString();
    browser.type = info.name + " " +info.version;
    return browser;
  })();
  console.log(exports.collector.browser);
  return exports;
})(window.exports === undefined? this: exports);