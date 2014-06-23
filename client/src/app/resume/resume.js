angular.module('my.site.controllers').
config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/resume', {
      templateUrl: 'views/resume/resume.html',
      controller: 'ResumeCtrl'
    });
  }
]).
controller('ResumeCtrl', ['$scope', '$resume',
  function($scope, $resume) {
    $scope.resume = $resume;
  }
]);
