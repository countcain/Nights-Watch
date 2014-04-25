/**
 * basicDataCollector:
 */
'use strict';

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

      /**
       * the browser.url will be a array:
       * [url, scheme, slash, host, port, path, query, hash]
       * @type {RegExp}
       */
      var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
      browser.url = parse_url.exec(document.URL);
      return browser;
    })();

    /**
     * after dom render finished, get all the element required.
     * In here, this function was given a element and a event.
     * we will generate this object for callback when this element's event triggered
     * {
     *    tagName:
     *    id:
     *    className:
     *    innerContent:
     *    event: String
     *    date: new Date() which this event happen
     * }
     */
    collector.interactionNodeList = [];
    collector.interaction = function(element, event, callback){
      function eventHappen(node){
            return function(){
              var currentE = null;
              if(node[event]!==null){
                currentE = node[event];
              }
              node[event]= function() {
                if(currentE!==null) currentE();
                var re = {
                  tagName: node.tagName,
                  id: node.id,
                  className: node.className,
                  innerContent: node.innerText,
                  event: event,
                  date: new Date()
                };
                callback(re);
              };
            }()
          }
      taskManager.addTaskWhenDomLoaded(function(){
        var node=null, nodeList=null;
        if(element.id!==undefined){
          node = document.getElementById(element.id);
          collector.interactionNodeList.push(node);
        }else if(element.class!==undefined){
          nodeList = document.getElementsByClassName(element.className);
          collector.interactionNodeList.concat(nodeList);
        }else{
          nodeList = document.getElementsByTagName(element.element);
          collector.interactionNodeList.concat(nodeList);
        }
        if(node!==null){
          eventHappen(node);
        }else{
          for(var i=0; i<nodeList.length; i++){
            eventHappen(nodeList[i]);
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
