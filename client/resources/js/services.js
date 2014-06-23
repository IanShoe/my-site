'use strict'

angular.module('mySite.services', []).
factory('ModuleService', function () {

  var _modules = [{
    name: 'Message Center',
    description: 'Easy Notification System',
    gitUrl: 'https://github.com/IanShoe/angular-message-center',
    url: 'views/message-center.html'
  },
  {
    name: 'Drag Module',
    description: 'Drag and Drop Handler',
    gitUrl: 'https://github.com/IanShoe/angular-dnd',
    url: 'views/drag-drop.html'
  },
  {
    name: 'Font Select Module',
    description: 'Awesome Font Selection Module',
    gitUrl: 'https://github.com/IanShoe/angular-font-select',
    url: 'views/font-select.html'
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
