'use strict';

var modules =  ['ngAnimate',
                'ngRoute',
                'mySite.services',
                'mySite.directives',
                'MessageCenter',
                'DragModule'];

var mySite = angular.module('my-site-app', modules);

/* Routing */
mySite.config(['$routeProvider', '$locationProvider', '$compileProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: '/views/home.html',
        controller: homeCtrl
    }).
    when('/about', {
        templateUrl: '/views/about.html',
        controller: aboutCtrl
    }).
    when('/contact', {
        templateUrl: '/views/contact.html',
        controller: contactCtrl
    }).
    when('/resume', {
        templateUrl: '/views/resume.html',
        controller: resumeCtrl
    }).
    when('/module', {
        templateUrl: '/views/module.html',
        controller: moduleCtrl
    }).
    otherwise({
      redirectTo: '/home'
  });
    $locationProvider.html5Mode(true);
}]);