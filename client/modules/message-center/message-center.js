angular.module('MessageCenter', []).
factory('MessageService', function ($rootScope) {
    var counter = 0;
    var messageItems = [];

    var MessageService = {};
    MessageService.config = {
        disabled: false
    }

    MessageService.configure = function(config){
        this.config.disabled = angular.isDefined(config.disabled) ? config.disabled : this.config.disabled;
    }

    MessageService.broadcast = function (message) {
        if(!this.config.disabled){
            counter++;
            var messageItem = {};
            messageItem.message = message;
            messageItem.id = counter;
            messageItems.push(messageItem);
            $rootScope.$broadcast('MessageService.broadcast', messageItem);
        }
        else {
            console.log('Message Service Disabled for message: '+ message);
        }
    };

    $rootScope.$on('MessageService.remove', function(message){
        messageItems.remove(message);
    });
    
    return MessageService;
}).
directive('messageCenter', function ($timeout) {
    return {
        restrict: 'E',
        scope: {},
        template: '<message ng-repeat="messageItem in messageItems"></message>',
        controller: function ($scope, $attrs, MessageService) {
            $scope.messageItems =  [];
            $scope.$on('MessageService.broadcast', function (event, message) {
                $scope.messageItems.push(message);
                $timeout(function(){
                    $scope.$emit('MessageService.remove', message);
                    $scope.messageItems.remove(message);
                }, 3000);
            });
        }
    };
}).
directive('message', function () {
    return {
        replace: true,
        restrict: 'E',
        template:   '<div class="message-box">' +
        '<span class="message-item">{{messageItem.message}}</span>' +
        '</div>'
    };
});

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

//Have a counter and switch out messages based on current counter