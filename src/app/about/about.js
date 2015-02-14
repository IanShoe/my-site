angular.module('my.site.controllers').
config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/about', {
      templateUrl: 'views/about/about.html',
      controller: 'AboutCtrl'
    });
  }
]).
controller('AboutCtrl', ['$scope', '$interval',
  function($scope, $interval) {
    var birthday = moment("May 18, 1990");
    $scope.seconds = Math.floor(moment().diff(birthday) / 1000);
    $scope.years = Math.floor($scope.seconds / 31536000);
    $interval(function() {
      $scope.seconds++;
    }, 1000);
  }
]);
