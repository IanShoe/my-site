'use strict';

var facebookModule = angular.module('FacebookModule', []);

facebookModule.factory('FacebookService', ['$rootScope', '$log', '$window', function ($rootScope, $log, $window) {
    var facebookService = {
        authorized: false
    };

    var FBService;

    facebookService.init = function(callback) {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '161871793989246',
                channelUrl : '//' + window.location.hostname + '/fbChannel.html',
                status     : true,
                cookie     : true,
                xfbml      : false
            });

            FBService = $window.FB;

            FBService.Event.subscribe('auth.authResponseChange', function (response) {
                $log.info("Event: auth.authResponseChange");
                if (response.authResponse) {
                    if (response.status === 'connected') {
                        $log.info('User logged in and authorized');
                        $rootScope.$apply(function () {
                            facebookService.authorized = true;
                        });
                    } else if (response.status === 'not_authorized') {
                        $log.info('User logged in');
                        $rootScope.$apply(function () {
                            facebookService.authorized = false;
                        });
                    } else {
                        $log.info('User logged out');
                        $rootScope.$apply(function () {
                            facebookService.authorized = false;
                        });
                    }
                } else {
                    $log.info('No valid authResponse found, user logged out');
                    $rootScope.$apply(function () {
                        facebookService.authorized = false;
                    });
                }
            });

            $rootScope.$apply(function() {
                callback();
            });
        };

        (function(d){
            var js, id = 'facebook-jssdk'; 
            var ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) return;
            js = d.createElement('script'); 
            js.id = id; 
            js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document));
    };

    facebookService.login = function(successCb, errorCb) {
        FBService.login(function (response) {
            $rootScope.$apply(function () {
                if (response.authResponse) {
                    successCb(response);
                } else {
                    errorCb('Login Unsuccessful');
                }
            });
        }, {scope: 'email,publish_actions'});
    };

    facebookService.logout = function() {
        FBService.logout(function() {
            $rootScope.$apply(function() {
                facebookService.authorized = false;
            });
        });
    };

    facebookService.getUserInfo = function(callback) {
        FBService.api('/me', function(data) {
            $rootScope.$apply(function() {
                callback(data);
            });
        });
    };

    facebookService.getLoginStatus = function() {
        FBService.getLoginStatus(function(response) {
            return response;
        });
    };

    facebookService.postMessage = function(message, callback){
        if(facebookService.authorized){
            postMessage();
        }
        else {
            facebookService.login(function(){
                postMessage();
            }, function(){
                callback('Error Authenticating');
            })
        }
        function postMessage(){
            FB.api('/me/feed', 'post', { message: message }, function(response) {
                if (!response || response.error) {
                    callback('Error Posting on Facebook');
                } else {
                    callback();
                }
            });
        }
    }

    facebookService.postStory = function(dialogConfig, callback) {
        if(facebookService.authorized){
            postStory(callback);
        }
        else {
            facebookService.login(function(){
                postStory(callback);
            }, function(){
                callback('Error Authenticating');
            })
        }
        function postStory(callback){
            FBService.ui(dialogConfig, function(response) {
                $rootScope.$apply(function(){
                    if (response && response.post_id) {
                        callback(null, 'Successfully Shared');
                    } else {
                        callback(true, 'Error Sharing Post');
                    }
                })
            });
        }
    }

    return facebookService;
}]);