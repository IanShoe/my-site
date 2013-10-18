'use strict';

var modules =  ['ngAnimate',
                'ngRoute',
                'mySite.services',
                'mySite.directives',
                'ui.bootstrap',
                'ui.bootstrap.font-group',
                'ui.router',
                'MessageCenter',
                'DragModule'];

var mySite = angular.module('my-site-app', modules);

/* Routing */
mySite.config(['$routeProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider' , function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
    // $stateProvider.
    // state('home', {
    //     url: '/home',
    //     templateUrl: '/views/home.html',
    //     controller: homeCtrl
    // }).
    // state('about', {
    //     url: '/about',
    //     templateUrl: '/views/about.html',
    //     controller: aboutCtrl
    // }).
    // state('contact', {
    //     url: '/contact',
    //     templateUrl: '/views/contact.html',
    //     controller: contactCtrl
    // }).
    // state('resume', {
    //     url: '/resume',
    //     templateUrl: '/views/resume.html',
    //     controller: resumeCtrl
    // }).
    // state('module', {
    //     url: '/module',
    //     templateUrl: '/views/module.html',
    //     controller: moduleCtrl
    // });
    // $urlRouterProvider.otherwise('/home');

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
    when('/test', {
        templateUrl: '/views/test.html'
    }).
    otherwise({
      redirectTo: '/home'
  });
    $locationProvider.html5Mode(true);
}]);