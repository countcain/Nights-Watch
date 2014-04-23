'use strict';

(function(){
  var taskManager = (function(){
    var taskM = {};
    taskM.taskArray = [];
    taskM.addTaskWhenDomLoaded = function(task){
      taskM.taskArray.push(task);
    };
    if(window.onload!==null){
      var currentF = window.onload;
      taskM.taskArray.push(currentF);
    }
    window.onload = function(){
      for(var i=0; i<taskM.taskArray.length; i++){
        taskM.taskArray[i]();
      }
    };
    return taskM;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = taskManager;
  }
  else {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return taskManager;
      });
    }
    else {
      window.taskManager = taskManager;
    }
  }

})();