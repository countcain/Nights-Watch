'use strict';

(function(basicDataCollector){
  var nightsWatcher = (function(basicDataCollector){
    var watcher = {};

    watcher.config = function(configObject){

    };

    watcher.identify = function(directive){

    };

    watcher.track = function(element, event, callback){
      basicDataCollector.interaction(element, event, function(trackedEvent){
        //here may store this event
        callback(trackedEvent);
      });
    };
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
