angular.module("nights-watch-demo", [])
.controller("BodyCtrl", ['$scope', function($scope){
      $scope.browser = collector.browser.type;
      $scope.platform = collector.browser.platform;
      $scope.referral = "";
      $scope.language = collector.browser.language;
    }]);