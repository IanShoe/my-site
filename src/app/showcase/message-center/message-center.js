angular.module('my.site.controllers').
controller('MessageCenterCtrl', ['$scope', '$location', '$timeout', 'MessageService',
  function($scope, $location, $timeout, MessageService) {
    MessageService.clearHistory();
    $scope.msg = 'Broadcast me!';
    $scope.colors = ['success', 'info', 'danger', 'primary', 'warning', 'none'];
    $scope.color = $scope.colors[5];
    $scope.max = 3;

    $scope.$watch('max', function(newValue, oldValue) {
      if (angular.isNumber(newValue)) {
        MessageService.configure({
          max: newValue
        });
      }
    });

    $scope.broadcast = function() {
      var opts = {
        important: $scope.important,
        color: ($scope.color !== 'none') ? $scope.color : undefined
      };
      MessageService.broadcast($scope.msg, opts);
    };

    var timers = [];

    timers.push($timeout(function() {
      MessageService.broadcast('Here is a regular message');
    }, 200));

    timers.push($timeout(function() {
      MessageService.broadcast('And this is an important message!', {
        important: true
      });
    }, 3000));

    timers.push($timeout(function() {
      MessageService.broadcast('Colors are also supported! - Success', {
        color: 'success'
      });
    }, 5500));

    timers.push($timeout(function() {
      MessageService.broadcast('Danger', {
        color: 'danger',
        important: true
      });
    }, 6500));

    timers.push($timeout(function() {
      MessageService.broadcast('Info', {
        color: 'info'
      });
    }, 7300));

    timers.push($timeout(function() {
      MessageService.broadcast('Primary', {
        color: 'primary'
      });
    }, 7800));

    timers.push($timeout(function() {
      MessageService.broadcast('Warning, and the max is set to 3!', {
        color: 'warning'
      });
    }, 8300));

    $scope.messageService = MessageService;

    $scope.$watch('messageService.getHistory()', function(newValue, oldValue) {
      $scope.history = newValue;
    });

    $scope.location = $location;

    $scope.$watch('location.path() + module.name', function(newValue, oldValue) {
      if ($location.path() !== '/showcase' || $scope.module.name !== 'Message Center') {
        for (var i = 0; i < timers.length; i++) {
          $timeout.cancel(timers[i]);
          MessageService.clearHistory();
        }
      }
    });
  }
]);
