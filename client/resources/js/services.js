'use strict'

var mySiteServices = angular.module('mySite.services', []);

mySiteServices.
factory('ModuleService', function () {

	var _modules = [{
		name: 'Message Center',
		description: 'Easy Notification System',
		url: 'views/message-center.html'
	},
	{
		name: 'Drag Module',
		description: 'Drag and Drop Handler',
		url: 'views/drag-drop.html'
	}];

	var _module = _modules[0];

	var moduleService = {
		setModule: function(module){
			_module = module;
		},
		getModule: function(){
			return _module;
		},
		getModules: function(){
			return _modules;
		}
	}
	return moduleService;
});