'use strict';

angular.module('my.site.controllers', []);
angular.module('my.site.directives', []);
angular.module('my.site.services', []);

var modules = [
  'ngAnimate',
  'ngRoute',
  'my.site.controllers',
  'my.site.services',
  'my.site.directives',
  'my-site.templates',
  'ui.bootstrap.font-group',
  'MessageCenter',
  'DragModule'
];

angular.module('my-site-app', modules).
config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/home'
    });
    $locationProvider.html5Mode(true);
  }
]).
controller('IndexCtrl', ['$scope', '$location', 'MessageService', 'ModuleService',
  function($scope, $location, MessageService, ModuleService) {
    $scope.modules = ModuleService.getModules();

    $scope.navClick = function() {
      $(".navbar-collapse").removeClass("in").addClass("collapse");
    };

    $scope.gotoModule = function(module) {
      ModuleService.setModule(module);
      $scope.navClick();
      $location.path('/showcase');
    };

    $scope.location = $location;

    $scope.$watch('location.path()', function(newValue, oldValue) {
      $scope.activeNav = newValue.split('/')[1];
    });
  }
]);
