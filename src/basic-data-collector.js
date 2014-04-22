/**
 * Collector:
 */
(function(exports){
  exports.collector = {"hello": "collector"};

  exports.collector.browser = (function(){
    var browser = {};
    var info = platform.parse(navigator.userAgent);
    browser.language = navigator.language || navigator.userLanguage || navigator.systemLanguage;
    browser.platform = info.os.toString();
    browser.type = info.name + " " +info.version;
    return browser;
  })();

  exports.collector.interaction = (function(){
    var interaction = {};

    var a_array = document.getElementsByTagName("a");
    console.log(a_array);
    interaction.clickElements = a_array.concat(document.getElementsByTagName("button"));
    console.log(interaction);
    return interaction;
  })();

  return exports;

})(window.exports === undefined? this: exports);