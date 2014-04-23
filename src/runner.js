/**
 * library usage
 */
'use strict';
(function(nightsWatcher){
  nightsWatcher.detect("userInfo", function(os, browser, language){
    console.log(os, browser, language);
  });
  //first parameter could be "a class id", element could be any types in DOM
  //second parameter could be any event: onclick onmouseover
  //third parameter is a callback function
  nightsWatcher.track({element:"a", id:"link_one"}, "onclick", function(elements){
    console.log(elements);
  });
})(nightsWatcher);