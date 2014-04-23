/**
 * basicDataCollector:
 */
(function(taskManager){
  var basicDataCollector = (function(taskManager){
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
    collector.interactionNodeList = [];
    collector.interaction = function(element, event, callback){
      taskManager.addTaskWhenDomLoaded(function(){
        var node, nodeList;
        if(element.id!==undefined){
          node = document.getElementById(element.id);
          collector.interactionNodeList.push(node);
        }else if(element.class!==undefined){
          nodeList = document.getElementsByClassName(element.class);
          collector.interactionNodeList.concat(nodeList);
        }else{
          nodeList = document.getElementsByTagName(element.element);
          collector.interactionNodeList.concat(nodeList);
        }
        if(node!==null){
          node[event] = function(){
            callback(node);
          };
        }else{
          function eventHappen(i){
            return callback(nodeList[i]);
          }
          for(var i=0; i<nodeList.length; i++){
            nodeList[i][event] = eventHappen(i);
          }
        }
      });
    };

    return collector;
  })(taskManager);

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

})(taskManager);
