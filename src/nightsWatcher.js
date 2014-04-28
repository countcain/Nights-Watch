'use strict';

(function(basicDataCollector, cookiesManager, taskManager){
  var nightsWatcher = (function(basicDataCollector, cookiesManager, taskManager){
    var watcher = {};

    watcher.config = function(configObject){
    };

    watcher.identify = function(arg1, arg2){
      taskManager.addAsyncTask(function(arg1, arg2){
        var obj = {
          Platform: basicDataCollector.browser.platform,
          Browser: basicDataCollector.browser.type,
          Language: basicDataCollector.browser.language,
          Country: basicDataCollector.geoLocation.country,
          City: basicDataCollector.geoLocation.city,
          Region: basicDataCollector.geoLocation.region
        };
        if(typeof arg1 === 'function'){
          arg1(obj);
        }else{
          if(arg1==='user'){
            arg2(obj, "new");
          }
        }
        taskManager.finishAsyncTask();
      }, null, [arg1, arg2]);
    };

    watcher.on = function(directive, callback){
      if(directive==='visitingStart'){
        callback({});
      }
    };

    watcher.track = function(element, event, callback){
      basicDataCollector.interaction(element, event, function(trackedEvent){
        //here may store this event
        callback(trackedEvent);
      });
    };

    watcher.run = function(){
      taskManager.asyncTaskExec();
    };
    return watcher;
  })(basicDataCollector, cookiesManager, taskManager);



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
})(basicDataCollector, cookiesManager, taskManager);