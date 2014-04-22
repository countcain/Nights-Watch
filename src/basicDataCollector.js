/**
 * basicDataCollector:
 */
(function(){
  var basicDataCollector = (function(){
    var collector = {};

    /**
     * use userAgent to detect os language and browser
     */
    collector.browser = (function(){
      var browser = {};
      var info = platform.parse(navigator.userAgent);
      browser.language = navigator.language || navigator.userLanguage || navigator.systemLanguage;
      browser.platform = info.os.toString();
      browser.type = info.name + " " +info.version;
      return browser;
    })();

    /**
     * after dom render finished, get all the element required.
     */
    collector.interaction = function(element, event, callback){
      if(element.id!==undefined){
        document.getElementById(element.id);
      }else if(element.class!==undefined){
        document.getElementsByClassName(element.class);
      }else{
        document.getElementsByTagName(element.element);
      }
    };

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
