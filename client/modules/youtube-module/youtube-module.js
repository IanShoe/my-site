'use strict';

var youtubeModule = angular.module('YoutubeModule', []);

youtubeModule.factory('YoutubeService', ['$http', function($http) {
	var youtubeService = {};

	var baseYoutubeUrl = '//gdata.youtube.com/feeds/mobile';
	var videoUrl = baseYoutubeUrl + '/videos';
	var playlistUrl = baseYoutubeUrl + '/playlists';

	youtubeService.search = function(searchTerm, successCb, errorCb) {
		successCb = successCb || angular.noop;
		errorCb = errorCb || angular.noop;

		var config = {
			method: 'GET',
			url: videoUrl,
			params: {
				'origin': (location.protocol + '//' + location.host),
				'max-results': 20,
				'start-index': 1,
				'alt': 'json',
				'q': searchTerm
			} 
		};

		$http(config).success(successCb).error(errorCb);
	};

	youtubeService.searchPlaylist = function(playlist, successCb, errorCb) {
		successCb = successCb || angular.noop;
		errorCb = errorCb || angular.noop;

		var config = {
			method: 'GET',
			url: (playlistUrl + '/' + playlist),
			params: {
				'origin': (location.protocol + '//' + location.host),
				'max-results': 20,
				'start-index': 1,
				'alt': 'json'
			}
		};

		$http(config).success(successCb).error(errorCb);
	};

	return youtubeService;
}]);