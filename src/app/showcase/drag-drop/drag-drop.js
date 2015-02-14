angular.module('my.site.controllers').
controller('DragDropCtrl', ['$scope', 'MessageService',
  function($scope, MessageService) {
    $scope.mediaFiles = {
      images: [{
        name: 'itunes',
        type: 'image',
        url: 'images/test-image-1.png'
      }, {
        name: 'play-fish',
        type: 'image',
        url: 'images/test-image-2.png'
      }, {
        name: 'wordpress',
        type: 'image',
        url: 'images/test-image-3.png'
      }, {
        name: 'candy-swirl',
        type: 'image',
        url: 'images/test-image-4.png'
      }],
      videos: [{
        name: 'test-video',
        type: 'video',
        url: 'videos/test.mp4'
      }]
    };

    $scope.drop1List = [];
    $scope.drop2List = [];

    $scope.drop1 = function(data) {
      $scope.drop1List.push(data);
      MessageService.info('Dropped in 1!');
    };

    $scope.drop2 = function(data) {
      $scope.drop2List.push(data);
      MessageService.info('Dropped in 2!');
    };
  }
]);
