/**
 * basicDataCollector:
 */
'use strict';

(function(taskManager, postman){
  var basicDataCollector = (function(taskManager, postman){
    var collector = {};
    /**
     * use userAgent to detect os language and browser
     */
    collector.browser = (function(){
      var browser = {
        platform: "",
        type: ""
      };

      taskManager.addAsyncTask(function(userAgent){
        var self = this;
        postman.get("http://mrpeach.me:3458", {userAgent:userAgent}, function(data){
          self.platform = data.os.family+" "+data.os.version;
          self.type = data.name+ " "+ data.version;
          taskManager.finishAsyncTask();
        });
      }, browser, [navigator.userAgent]);

      browser.language = navigator.language || navigator.userLanguage || navigator.systemLanguage;

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
                  targetTag: node.tagName,
                  targetId: node.id,
                  targetClass: node.className,
                  innerContent: node.innerText,
                  type: event,
                  time: new Date().getTime(),
                  domain: collector.browser.url[3],
                  path: collector.browser.url[5],
                  hash: collector.browser.url[7],
                  query: collector.browser.url[6]
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
        }else if(element.className!==undefined){
          nodeList = document.getElementsByClassName(element.className);
          collector.interactionNodeList.concat(nodeList);
        }else{
          nodeList = document.getElementsByTagName(element.element);
          collector.interactionNodeList.concat(nodeList);
        }
        if(node!==null){
          eventHappen(node);
        }else{
          if(nodeList!==null)
            for(var i=0; i<nodeList.length; i++)
              eventHappen(nodeList[i]);
        }
      });
    };

    /**
     * getIp and calculate location
     * has city region country ip
     */
    collector.geoLocation = (function(){
      var geoLocation = {};
      taskManager.addAsyncTask(function(){
        var self = this;
        postman.get("http://ipinfo.io", null, function(data){
          self.city = data.city;
          self.region = data.region;
          self.country = data.country;
          self.ip = data.ip;
          taskManager.finishAsyncTask();
        });
      }, geoLocation);
      return geoLocation;
    })();

    console.log("Here is basicDataCollector object", collector);
    return collector;
  })(taskManager, postman);


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
})(taskManager, postman);
