'use strict';

(function(basicDataCollector){
  var nightsWatcher = (function(basicDataCollector){
    var watcher = {};

    watcher.detect = function(directive, callback){
      if(directive==="userInfo"){
        callback(basicDataCollector.browser.type, basicDataCollector.browser.platform, basicDataCollector.browser.language);
      }
    };

    watcher.track = function(element, event, callback){};
    return watcher;
  })(basicDataCollector);
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = nightsWatcher;
  }
  else {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return nightsWatcher;
      });
    }
    else {
      window.nightsWatcher = nightsWatcher;
    }
  }
})(basicDataCollector);
