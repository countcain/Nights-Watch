/**
 * library usage
 */
'use strict';
(function(nightsWatcher){

  nightsWatcher.config(
      {
        server: "@@server",
        domainToken: "@@token"
      }
  );

  /** function identify
   * parameter:
   *    user: if you have a server which store the existing user, pass this param, the function will detect whether
   *            there is a existing user based on the client-side cookie.
   *          if yes, retrieve that and return the userInfo, userType will be 'existing'.
   *          if no, return the userInfo, userType will be 'new'. In the meantime, a new user will be added into server.
   *    null: if we do not won't to judge the user is new or existing, just pass no param to this function.
   *          The function will only return the userInfo.
   * return:
   *    userInfo:
   *    userType: new or existing
   */
  nightsWatcher.identify("user", function(userInfo, userType){
    console.log("runner identify user", userInfo, userType);
  });
//  nightsWatcher.identify(function(userInfo){
//    console.log("runner identify", userInfo);
//  });

  /**
   * waiting for visitingStart event.
   *
   * return: visitObject
   */
  nightsWatcher.on("visitingStart", function(visitObject){
    console.log("runner visitingStart", visitObject);
  });

  /**
   * Event trigger.
   * parameter:
   *    dom object: {element:tagName, id:tagId, className:tagClassName}
   *    type: dom element event
   *    function: callback
   * return:
   *    event object
   */
  nightsWatcher.track({element:"a", id:"link_one"}, "onclick", function(trackedEvent){
    console.log("runner track event", trackedEvent);
  });
  nightsWatcher.track({element:"button"}, "onmouseover", function(trackedEvent){
    console.log("runner track event", trackedEvent);
  });

  nightsWatcher.run();

})(nightsWatcher);