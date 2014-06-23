angular.module('my.site.controllers').
config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/showcase', {
      templateUrl: 'views/showcase/showcase.html',
      controller: 'ShowcaseCtrl'
    });
  }
]).
controller('ShowcaseCtrl', ['$scope', 'ModuleService',
  function($scope, ModuleService) {
    $scope.moduleService = ModuleService;

    $scope.$watch('moduleService.getModule()', function(newValue) {
      $scope.module = newValue;
    });
  }
]);
