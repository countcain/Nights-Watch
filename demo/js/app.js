angular.module("nights-watch-demo", [])
.controller("BodyCtrl", ['$scope', function($scope){
      $scope.browser = basicDataCollector.browser.type;
      $scope.platform = basicDataCollector.browser.platform;
      $scope.referral = "";
      $scope.language = basicDataCollector.browser.language;
    }]);