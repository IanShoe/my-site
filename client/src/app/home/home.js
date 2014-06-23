angular.module('my.site.controllers').
config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'views/home/home.html',
      controller: 'HomeCtrl'
    });
  }
]).
controller('HomeCtrl', ['$scope', function($scope) {

}]);
