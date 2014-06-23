angular.module('my.site.services').
service('ModuleService', function() {

  var _modules = [{
    name: 'Message Center',
    description: 'Easy Notification System',
    gitUrl: 'https://github.com/IanShoe/angular-message-center',
    url: 'views/showcase/message-center/message-center.html'
  }, {
    name: 'Drag Module',
    description: 'Drag and Drop Handler',
    gitUrl: 'https://github.com/IanShoe/angular-dnd',
    url: 'views/showcase/drag-drop/drag-drop.html'
  }, {
    name: 'Font Select Module',
    description: 'Awesome Font Selection Module',
    gitUrl: 'https://github.com/IanShoe/angular-font-select',
    url: 'views/showcase/font-select/font-select.html'
  }];

  var _module = _modules[0];

  var moduleService = {
    setModule: function(module) {
      _module = module;
    },
    getModule: function() {
      return _module;
    },
    getModules: function() {
      return _modules;
    }
  };
  return moduleService;
});
