Nights-Watch
============

Watch the user's behavior when they visit a website page.

## For development

1. npm install & bower install
2. npm start

Open the browser and navigate to localhost:9001 to see the demo.

## For production use

1. npm install
2. npm build

build/nights-watch.js is what you need

## Sample

      nightsWatcher.detect("userInfo", function(os, browser, language){
        console.log(os, browser, language);
      });
      nightsWatcher.detect("page", function(urlArray){
        console.log(urlArray);
      });

      //first parameter could be "a class id", element could be any types in DOM
      //second parameter could be any event: onclick onmouseover
      //third parameter is a callback function
      nightsWatcher.track({element:"a", id:"link_one"}, "onclick", function(trackedEvent){
        console.log(trackedEvent);
      });
      nightsWatcher.track({element:"button"}, "onmouseover", function(trackedEvent){
        console.log(trackedEvent);
      });
...


