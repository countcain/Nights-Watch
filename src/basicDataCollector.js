/**
 * basicDataCollector:
 */
(function(){
  var basicDataCollector = (function(){
    var collector = {"hello": "collector"};

    collector.browser = (function(){
      var browser = {};
      var info = platform.parse(navigator.userAgent);
      browser.language = navigator.language || navigator.userLanguage || navigator.systemLanguage;
      browser.platform = info.os.toString();
      browser.type = info.name + " " +info.version;
      return browser;
    })();

    collector.interaction = (function(){
      var interaction = {};

      var a_array = document.getElementsByTagName("a");
      console.log(a_array);
      return interaction;
    })();
    return collector;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = basicDataCollector;
  }
  else {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return basicDataCollector;
      });
    }
    else {
      window.basicDataCollector = basicDataCollector;
    }
  }

})();
