'use strict';
(function(taskManager, basicDataCollector){
  var cookiesManager = (function(taskManager){
    var cookiesM = {};

    cookiesM.currentUser = window.localStorage.getItem("uniqueUserCookie");
    /**
     * if currentUser cookie is null, generate a new one.
     */
    if(!cookiesM.currentUser){
//      taskManager.addAsyncTask(function(basicData){
//        var shaObj = new jsSHA(
//            basicData.browser.platform +
//            basicData.browser.type +
//            basicData.browser.language +
//            basicData.geoLocation.ip +
//            new Date().toString,
//            "TEXT"
//        );
//        cookiesM.currentUser = shaObj.getHash("SHA-1", "HEX");
//        console.log(cookiesM.currentUser);
//        taskManager.finishAsyncTask();
//      }, cookiesM, [basicDataCollector]);
    }
    console.log("Here is cookiesM object", cookiesM);
    return cookiesM;
  })(taskManager, basicDataCollector);



  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = cookiesManager;
  }
  else {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return cookiesManager;
      });
    }
    else {
      window.cookiesManager = cookiesManager;
    }
  }
})(taskManager, basicDataCollector);