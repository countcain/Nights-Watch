'use strict';
(function(taskManager){
  var cookiesManager = (function(taskManager){
    var cookiesM = {};

    cookiesM.currentUser = window.localStorage.getItem("uniqueUserCookie");
    cookiesM.generateCookiesForNewUser = function(basedData){
    };
    console.log("Here is cookiesM object", cookiesM);
    return cookiesM;
  })(taskManager);



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
})(taskManager);