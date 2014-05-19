'use strict';

(function(){
  var taskManager = (function(){
    var taskM = {};

    /**
     * use for event which will be exec after dom loaded
     * @type {Array}
     */
    taskM.domTaskArray = [];
    taskM.addTaskWhenDomLoaded = function(task){
      taskM.domTaskArray.push(task);
    };

    /**
     * this is the event loop
     * @type {Array}
     */
    taskM.asyncTask = [];
    taskM.addAsyncTask = function(task, self, arguArray){
      taskM.asyncTask.push({
        task: task,
        self: self,
        arguArray: arguArray
      });
    };
    taskM.finishAsyncTask = function(){
      taskM.asyncTask.shift();
      if(taskM.asyncTask.length!==0){
        taskM.asyncTask[0].task.apply(taskM.asyncTask[0].self, taskM.asyncTask[0].arguArray);
      }
    };
    taskM.asyncTaskExec = function(){
      if(taskM.asyncTask.length!==0){
        taskM.asyncTask[0].task.apply(taskM.asyncTask[0].self, taskM.asyncTask[0].arguArray);
      }
    };


    if(window.onload!==null){
      var currentF = window.onload;
      taskM.domTaskArray.push(currentF);
    }
    window.onload = function(){
      for(var i=0; i<taskM.domTaskArray.length; i++){
        taskM.domTaskArray[i]();
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