angular.module('my.site.controllers').
config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/contact', {
      templateUrl: 'views/contact/contact.html',
      controller: 'ContactCtrl'
    });
  }
]).
controller('ContactCtrl', ['$scope', function($scope){

}]);
