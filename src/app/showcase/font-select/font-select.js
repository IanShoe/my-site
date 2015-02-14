angular.module('my.site.controllers').
controller('FontSelectCtrl', ['$scope',
  function($scope) {
    $scope.fonts = [
      'Arial',
      'Arial Black',
      'Courier New',
      'Cursive',
      'Georgia',
      'Helvetica',
      'Impact',
      'Tahoma',
      'Times New Roman',
      'Verdana'
    ];
    $scope.myFont = $scope.fonts[2];

    $scope.addFont = function() {
      for (var i = $scope.fonts.length - 1; i >= 0; i--) {
        if ($scope.newFont.toLowerCase() === $scope.fonts[i].toLowerCase()) {
          return;
        }
      }
      $scope.fonts.push($scope.newFont.proper());
    };
  }
]);
