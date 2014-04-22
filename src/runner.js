/**
 * library usage
 */
'use strict';
(function(nightsWatcher){
  nightsWatcher.detect("userInfo", function(os, browser, language){
    console.log(os, browser, language);
  });
  //first params could be "a id class", element could be any types in DOM
  // second params could be any event
  nightsWatcher.track("a", "hover", function(elementChain){
  });
})(nightsWatcher);