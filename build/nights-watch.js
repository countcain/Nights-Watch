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
'use strict';
(function(){
  /*
   * Lightweight JSONP fetcher
   * Usage:
   *
   * postman.get( 'someUrl.php', {param1:'123', param2:'456'}, function(data){
   *   //do something with data, which is the JSON object you should retrieve from someUrl.php
   * });
   */
  var postman = (function(){
    var counter = 0, head, config = {};
    function load(url, pfnError) {
      var script = document.createElement('script'),
          done = false;
      script.src = url;
      script.async = true;

      var errorHandler = pfnError || config.error;
      if ( typeof errorHandler === 'function' ) {
        script.onerror = function(ex){
          errorHandler({url: url, event: ex});
        };
      }

      script.onload = script.onreadystatechange = function() {
        if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
          done = true;
          script.onload = script.onreadystatechange = null;
          if ( script && script.parentNode ) {
            script.parentNode.removeChild( script );
          }
        }
      };

      if ( !head ) {
        head = document.getElementsByTagName('head')[0];
      }
      head.appendChild( script );
    }
    function encode(str) {
      return encodeURIComponent(str);
    }
    function jsonp(url, params, callback, callbackName) {
      var query = (url||'').indexOf('?') === -1 ? '?' : '&', key;

      callbackName = (callbackName||config['callbackName']||'callback');
      var uniqueName = callbackName + "_json" + (++counter);

      params = params || {};
      for ( key in params ) {
        if ( params.hasOwnProperty(key) ) {
          query += encode(key) + "=" + encode(params[key]) + "&";
        }
      }
      window[ uniqueName ] = function(data){
        callback(data);
        try {
          delete window[ uniqueName ];
        } catch (e) {}
        window[ uniqueName ] = null;
      };

      load(url + query + callbackName + '=' + uniqueName);
      return uniqueName;
    }
    function setDefaults(obj){
      config = obj;
    }
    return {
      get:jsonp,
      init:setDefaults
    };
  }());

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = postman;
  }
  else {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return postman;
      });
    }
    else {
      window.postman = postman;
    }
  }
})();

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
                  TargetTag: node.tagName,
                  TargetId: node.id,
                  TargetClass: node.className,
                  InnerContent: node.innerText,
                  Type: event,
                  Time: new Date().getTime(),
                  Domain: collector.browser.url[3],
                  Path: collector.browser.url[5],
                  Hash: collector.browser.url[7] || "",
                  Query: collector.browser.url[6] || ""
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

'use strict';
(function(taskManager, basicDataCollector, postman){
  var cookiesManager = (function(taskManager, basicDataCollector, postman){
    var cookiesM = {};

    cookiesM.currentUser = window.localStorage.getItem("nwuUC");
    cookiesM.joindate = window.localStorage.getItem("nwjd");
    /**
     * if currentUser cookie is null, generate a new one.
     */
    if(!cookiesM.currentUser){
      cookiesM.userType = "new";
      taskManager.addAsyncTask(function(basicData){
        var req =
            basicData.browser.platform +
            basicData.browser.type +
            basicData.browser.language +
            basicData.geoLocation.ip +
            new Date().toString();
        postman.get( 'http://jssha.mrpeach.me', {text:req, type:'TEXT'}, function(data){
          cookiesM.currentUser = data.hash;
          cookiesM.joindate = new Date().getTime();
          window.localStorage.setItem("nwuUC", cookiesM.currentUser);
          window.localStorage.setItem("nwjd", cookiesM.joindate);
          taskManager.finishAsyncTask();
        });
      }, cookiesM, [basicDataCollector]);
    }
    else{
      cookiesM.userType = "existing";
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
'use strict';

(function(basicDataCollector, cookiesManager, taskManager, postman){
  var nightsWatcher = (function(basicDataCollector, cookiesManager, taskManager, postman){

    /**
     * contains:
     *  watcher.user = {
     *     Platform: String,
     *     Browser: String,
     *     Language: String,
     *     Country: String,
     *     City: String,
     *     Region: String,
     *     UserId: String,
     *     JoinDate: Int
     *  }
     *  watcher.visit = {
     *     Time: String,
     *     UserId: String,
     *     Site: String,
     *     VisitId: //need to be generated by server
     *  }
     *  watcher
     * @type {{}}
     */
    var watcher = {
      user: null,
      visit: {},
      events: [],
      configObj:{}
    };

    /**
     * require
     * @param configObject
     */
    watcher.config = function(configObject){
      watcher.configObj = configObject;
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
            obj.JoinDate = cookiesManager.joindate;
            watcher.user = obj;
            watcher.visit.UserId = obj.UserId;
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
        var startDate = new Date().getTime();
        watcher.visit = {
          Time: startDate,
          Site: basicDataCollector.browser.url[3]
        };
        callback(watcher.visit);
      }
    };

    watcher.track = function(element, event, callback){
      basicDataCollector.interaction(element, event, function(trackedEvent){
        trackedEvent.UserId = watcher.user.UserId;
        watcher.events.push(trackedEvent);
        callback(trackedEvent);
      });
    };

    watcher.run = function(){
      taskManager.addAsyncTask(function(){
        var self = this;
        self.user.type = 1;
        self.user.token = self.configObj.domainToken;

        self.visit.type =2;
        self.visit.token = self.configObj.domainToken;
        postman.get(self.configObj.server, self.user, function(data){
          postman.get(self.configObj.server, self.visit, function(data){
            self.visit.VisitId = data._id;
            taskManager.finishAsyncTask();
          });
        });
      }, watcher);

      taskManager.addAsyncTask(function(){
        var self = this;
        self.events.push({
          Type: "viewpage",
          Time: new Date().getTime(),
          Domain: basicDataCollector.browser.url[3],
          Path: basicDataCollector.browser.url[5],
          Hash: basicDataCollector.browser.url[7] || "",
          Query: basicDataCollector.browser.url[6] || "",
          UserId: self.user.UserId,
          TargetTag: "",
          TargetId: "",
          TargetClass: "",
          InnerContent: ""
        });
        taskManager.finishAsyncTask();
      }, watcher);

      taskManager.addAsyncTask(function(){
        var self = this;
        setInterval(function(){
          for(var i=0;  i < self.events.length; i++){
            self.events[i].VisitId = self.visit.VisitId || "";
          }
          postman.get(self.configObj.server, {type:3, token:self.configObj.domainToken, data:JSON.stringify(self.events)}, function(data){
            self.events = [];
            taskManager.finishAsyncTask();
          });
        }, 1000*2);
        taskManager.finishAsyncTask();
      }, watcher);
      taskManager.asyncTaskExec();
    };
    return watcher;
  })(basicDataCollector, cookiesManager, taskManager, postman);

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
})(basicDataCollector, cookiesManager, taskManager, postman);