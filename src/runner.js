/**
 * library usage
 */
'use strict';
(function(nightsWatcher){
  nightsWatcher.detect("userInfo", function(os, browser, language){
    console.log(os, browser, language);
  });
  //first parameter could be "a class id", element could be any types in DOM
  //second parameter could be any event
  //third parameter is a callback function
  nightsWatcher.track({element:"a", id:"id", class:"class"}, "hover", function(elementChain){
  });
})(nightsWatcher);