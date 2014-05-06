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
          watcher.user = obj;
          arg1(obj);
        }else{
          if(arg1==='user'){
            obj.UserId = cookiesManager.currentUser;
            obj.JoinDate = cookiesManager.joinDate;
            watcher.user = obj;
            arg2(obj, cookiesManager.userType);
          }
        }
        taskManager.finishAsyncTask();
      }, null, [arg1, arg2]);
    };

    /**
     * store the start event
     * @param directive
     * @param callback
     */
    watcher.on = function(directive, callback){
      if(directive==='visitingStart'){
        var startDate = new Date();
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