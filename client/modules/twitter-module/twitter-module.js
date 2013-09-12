'use strict';

var twitterModule = angular.module('TwitterModule', []);

twitterModule.factory('TwitterService', ['$rootScope', '$http', '$log', '$window', function ($rootScope, $http, $log, $window) {

	var TwitterService = {};

	TwitterService.login = function(callback){
		$http.get('/mobile-engagements/getTwitterRequestToken').success(function(response){
			if(response.token){
				callback(true);
				// $window.location.href = 'https://twitter.com/oauth/authenticate?oauth_token='+ response.token;
			}
			else {
				callback(false);
			}
		}).error(function(){
			callback(false);
		})
	}
	return TwitterService;
}]);