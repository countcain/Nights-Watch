'use strict';
(function(taskManager, basicDataCollector, postman){
  var cookiesManager = (function(taskManager, basicDataCollector, postman){
    var cookiesM = {};

    cookiesM.currentUser = window.localStorage.getItem("uniqueUserCookie");
    cookiesM.joinDate = window.localStorage.getItem("joinDate");
    /**
     * if currentUser cookie is null, generate a new one.
     */
    if(!cookiesM.currentUser){
      taskManager.addAsyncTask(function(basicData){
        var req =
            basicData.browser.platform +
            basicData.browser.type +
            basicData.browser.language +
            basicData.geoLocation.ip +
            new Date().toString();
        postman.get( 'http://jssha.mrpeach.me', {text:req, type:'TEXT'}, function(data){
          cookiesM.currentUser = data.hash;
          cookiesM.joinDate = new Date().toString();
          window.localStorage.setItem("uniqueUserCookie", cookiesM.currentUser);
          window.localStorage.setItem("joinDate", cookiesM.joinDate);
          taskManager.finishAsyncTask();
        });
      }, cookiesM, [basicDataCollector]);
    }
    console.log("Here is cookiesM object", cookiesM);
    return cookiesM;
  })(taskManager, basicDataCollector, postman);



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
})(taskManager, basicDataCollector, postman);