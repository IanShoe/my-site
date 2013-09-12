'use strict'

var mySiteServices = angular.module('mySite.services', []);

mySiteServices.
factory('ModuleService', function () {

	var _module;

	var moduleService = {
		setModule: function(module){
			_module = module;
		},
		getModule: function(){
			return _module;
		}
	}
	return moduleService;
});