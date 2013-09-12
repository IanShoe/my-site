'use strict';

var userModule = angular.module('UserModule', []);

userModule.factory('UserService', function($http){
	var userService = {};

	var user = {};

	userService.getUser = function(){
		return user;
	}

	userService.saveAccount = function(callback){
		var accountBundle = {
			username: user.username,
			domainName: user.domainName,
			account: user.account
		};

		$http.post('/mobile-engagements/designer/user/saveAccount', {user: accountBundle}).
		success(function(response) {
			if(callback){
				callback(true);
			}
		}).error(function(response){
			if(callback){
				callback(false);
			}
		});
	};

	userService.retrieveUser = function(callback){
		$http.get('/mobile-engagements/designer/user').
		success(function(userResult){
			user = userResult;
			if(callback){
				callback(null, userResult);
			}
		}).error(function(response){
			if(callback){
				callback(true);
			}
		});
	}

	return userService;
});