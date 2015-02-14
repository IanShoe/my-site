Array.prototype.advancedFind = function(instance, properties) {
  var found = {};
  if(!instance){
    throw new Error("No instance specified");
  }
  if(!properties){
    for (var i = 0; i < this.length; i++) {
      if (this[i] === instance) {
        found.index = i;
        found.item = this[i];
        return found;
      }
    }
  }
  if(properties instanceof Array){
    if(properties.length === 0) {
      throw new Error("No properties specified");
    }
    for (var i = 0; i < this.length; i++) {
      var matching = true;
      for(var j= 0; j < properties.length; j++){
        if (!(this[i][properties[j]] === instance[properties[j]] || this[i][properties[j]] === instance)) {
          matching = false;
          break;
        }
      }
      if(matching){
        found.index = i;
        found.item = this[i];
        return found;
      }
    }
  }
  else if(isString(properties)){
    if(properties === '') {
      throw new Error("No property specified");
    }
    for (var i = 0; i < this.length; i++) {
      if (this[i][properties] === instance[properties] || this[i][properties] === instance) {
        found.index = i;
        found.item = this[i];
        return found;
      }
    }
  }
  return null;
};

Array.prototype.contains = function(obj) {
  var i = this.length;
  while (i--) {
    if (this[i] == obj) return true;
  }
  return false;
};

Array.prototype.move = function(from,to){
  this.splice(to,0,this.splice(from,1)[0]);
  return this;
};

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

Array.prototype.upsert = function(instance, properties) {
  var found = this.advancedFind(instance, properties);
  if(found){
    this.splice(found.index, 1, instance);
  }
  else{
    this.push(instance);
  }
};

// String protoypes

String.prototype.camelCaseToDashed = function() {
  return this.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

String.prototype.isLower = function() {
  return /[a-z]/.test(this);
};

String.prototype.isUpper = function() {
  return /[A-Z]/.test(this);
};

String.prototype.jam = function(str, position, delimiter) {
  if (!str) return this.toString();
  if (this.length === 0) {
    return str;
  }

  position = position || 0;
  delimiter = delimiter || '';

  var parts = this.split(delimiter);
  parts.splice(position, 0, str);
  return parts.join(delimiter);
};

String.prototype.loweredAndDashed = function() {
  return this.toLowerCase().split(' ').join('-');
};

String.prototype.proper = function() {
      return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

String.prototype.retrieveByDelimitation = function(positions, delimiter) {
  if(positions !== 0 && !positions) return null;
  if(!delimiter) return this.toString();
  var parts = this.split(delimiter);
  if(positions instanceof Array) {
    var newArray = [];
    for(var i = 0; i < positions.length; i++){
      newArray.push(parts[positions[i]]);
    }
    return newArray;
  }
  else {
    return parts[positions];
  }
};

String.prototype.toCamelCase = function() {
  return this.replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2, offset) {
    if (p2) return p2.toUpperCase();
    return p1.toLowerCase();
  });
};

function isString(obj) {
  return toString.call(obj) == '[object String]';
}

function unCamel(string){
  var camelString = '';
  for (var i = 0; i < string.length; i++) {
    if(i == 0){
      camelString = camelString.concat(string[i].toUpperCase());
      continue;
    }
    else if(string[i].isUpper()){
      camelString = camelString.concat(' ');
    }
    camelString = camelString.concat(string[i]);
  };
  return camelString;
}

// Version 4 (random) UUID generator
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);})
};

(function(module) {
try {
  module = angular.module('my-site.templates');
} catch (e) {
  module = angular.module('my-site.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/about/about.html',
    '<div class="headline-container">My name\'s Ian and I am a <span class="hoverable" tooltip="May 18th, 1990" tooltip-placement="bottom">{{seconds | number}}</span> seconds <span class="subtle">({{years}} year)</span> old software engineer.</div><div>Checklist</div><div><i class="glyphicon glyphicon-check"></i> Badass Software Engineer</div><div><i class="glyphicon glyphicon-check"></i> Badass Drummer</div><div><i class="glyphicon glyphicon-check"></i> Badass Tennis Player</div><div><i class="glyphicon glyphicon-remove-circle"></i> Badass Cook <span class="subtle">Not yet!</span></div>');
}]);
})();

'use strict';

angular.module('my.site.controllers', []);
angular.module('my.site.directives', []);
angular.module('my.site.services', []);

var modules = [
  'ngAnimate',
  'ngRoute',
  'my.site.controllers',
  'my.site.directives',
  'my.site.services',
  'my-site.templates',
  'ui.bootstrap.font-group',
  'MessageCenter',
  'DragModule'
];

angular.module('my-site-app', modules).
config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/home'
    });
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });
  }
]).
controller('IndexCtrl', ['$scope', '$location', 'MessageService', 'ModuleService',
  function($scope, $location, MessageService, ModuleService) {
    $scope.modules = ModuleService.getModules();

    $scope.navClick = function() {
      $(".navbar-collapse").removeClass("in").addClass("collapse");
    };

    $scope.gotoModule = function(module) {
      ModuleService.setModule(module);
      $scope.navClick();
      $location.path('/showcase');
    };

    $scope.location = $location;

    $scope.$watch('location.path()', function(newValue, oldValue) {
      $scope.activeNav = newValue.split('/')[1];
    });
  }
]);
(function(module) {
try {
  module = angular.module('my-site.templates');
} catch (e) {
  module = angular.module('my-site.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/home/home.html',
    '<div>Welcome to DevElementz!</div><span class="subtle">Best Viewed with Google Chrome</span>');
}]);
})();

angular.module('my.site.directives').
directive('xpBar', ['$timeout',
  function($timeout) {

    var XP = function(value) {

      if (value > 1800) {
        this.level = 'Master';
        this.stars = [5];
      } else if (value > 1400) {
        this.level = 'Expert';
        this.stars = [4];
      } else if (value > 800) {
        this.level = 'Advanced';
        this.stars = [3];
      } else if (value > 200) {
        this.level = 'Skilled';
        this.stars = [2];
      } else {
        this.level = 'Beginner';
        this.stars = [1];
      }
      var percent = value / 20;
      this.style = {
        eWidth: percent + '%',
        width: '1px',
        backgroundColor: 'hsl(' + (percent / 100 * 220) + ', 100%, 60%)'
      };
    };

    return {
      scope: {
        name: '=',
        xp: '='
      },
      restrict: 'AE',
      template:
        '<div class="xp-container">' +
          '<div class="xp-bar-header">' +
            '<span class="xp-bar-title">{{name}}</span>' +
            '<span class="xp-bar-level">{{metadata.level}}</span>' +
          '</div>' +
          '<div class="xp-bar">' +
            '<div class="xp-bar-number">{{xp}} xp</div>' +
            '<div class="xp-bar-stars">' +
              '<i class="glyphicon glyphicon-star" ng-repeat="i in metadata.stars"></i>' +
            '</div>' +
            '<div class="xp-bar-back" ng-style="metadata.style"></div>' +
          '</div>' +
        '</div>',
      replace: true,
      link: function(scope, elem, attrs) {
        scope.$watch('xp', function(newValue) {
          if (isFinite(newValue)) {
            scope.metadata = new XP(newValue);
            $timeout(function() {
              scope.metadata.style.width = scope.metadata.style.eWidth;
            }, 10);
          }
        });
      }
    };
  }
]);
(function(module) {
try {
  module = angular.module('my-site.templates');
} catch (e) {
  module = angular.module('my-site.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/resume/resume.html',
    '<div class="row"><div class="main-content col-md-8"><div class="resume-header row"><div class="col-sm-8"><span class="resume-name">{{resume.name}}</span><div>E-mail: {{resume.email}}</div><div ng-show="resume.tel">Telephone: {{resume.tel}}</div><div>Occupation: {{resume.occupation}}</div></div><div class="col-sm-4"><div ng-switch="" on="user.access"><address class="resume-address" ng-switch-when="true"><div>{{resume.address.street}}</div><div><span>{{resume.address.city}},</span> <span>{{resume.address.state}}</span> <span>{{resume.address.zip}}</span></div></address><address class="resume-address" ng-switch-default="">Contact me for details</address></div></div></div><h4 class="header">Professional Experience</h4><div class="row" ng-repeat="job in resume.jobs"><div class="col-sm-8"><div>{{job.company}}</div><div>{{job.title}}</div><ul><li ng-repeat="item in job.details">{{item.description}}</li></ul></div><div class="col-sm-4"><a href="{{job.logo.linkUrl}}" target="_blank"><img class="logo-image" ng-style="{height: job.logo.height}" ng-src="{{job.logo.url}}"></a></div></div><h4 class="header">Education</h4><div ng-repeat="college in resume.education.colleges"><div class="row"><div class="col-sm-8"><div>{{college.name}}</div><div>{{college.degree}}</div><div>Graduation: {{college.graduation}}</div></div><div class="col-sm-4"><a href="{{college.logo.linkUrl}}" target="_blank"><img class="logo-image" ng-style="{height: college.logo.height}" ng-src="{{college.logo.url}}"></a></div></div><div class="row"><div class="col-sm-12 col-md-12">Upper Level Courses<ul><li ng-repeat="course in college.courses">{{course.name}}</li></ul></div></div></div></div><div class="side-content col-md-4"><h4 class="header">Skills and Technology</h4><hr class="flair-divider"><div class="skill-set" ng-repeat="skill in resume.skills | orderBy: \'-xp\'"><xp-bar xp="skill.xp" name="skill.name"></xp-bar></div></div></div>');
}]);
})();

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

(function(module) {
try {
  module = angular.module('my-site.templates');
} catch (e) {
  module = angular.module('my-site.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/contact/contact.html',
    '<div>Ian Shoemaker</div><div>E-mail: iss90g@gmail.com</div><div>Telephone: 814-421-2872</div>');
}]);
})();

angular.module('my.site.services').
constant('$resume', {
  name: 'Ian Shintaro Shoemaker',
  email: 'iss90g@gmail.com',
  occupation: 'Software Engineer',
  address: {
    street: '100 Robin Ln',
    state: 'PA',
    city: 'Hummelstown',
    zip: 17036
  },
  objective: 'A software engineer with 2 years of experience building dynamic and scalable systems using Spring, J2EE and NodeJS backend technologies as well as web clients to facilitate data capture and analysis. Proficient in HTML5/CSS3, AngularJS and Bootstrap cutting edge web technologies to build both desktop and mobile ready web applications. Has experience and passion in creating clear, concise, and reusable modules to architect elegant solutions.',
  education: {
    colleges: [{
      name: 'University of Pittsburgh',
      degree: 'Bachelor of Science',
      graduation: '2012-05-01',
      courses: [{
        name: 'Artificial Intelligence'
      }, {
        name: 'Embedded Systems'
      }, {
        name: 'Database Management Systems'
      }, {
        name: 'Knowledge Discovery in Databases (Data Mining)'
      }, {
        name: 'Mobile Applications (iOS)'
      }, {
        name: 'Web Programming'
      }],
      logo: {
        name: 'Pitt-Logo',
        url: 'images/Pitt-Logo.png',
        height: '75px',
        linkUrl: 'http://www.pitt.edu'
      }
    }]
  },
  jobs: [{
    company: 'Versatile Systems, Inc.',
    start: '2013-04-01',
    end: '2013-09-10',
    title: 'Software Engineer',
    details: [{
      description: 'Developed and maintained URL shortening and redirection service for both customer and internal use'
    }, {
      description: 'Architected and implemented web app (Mobile Engagements) allowing users to build, customize and deploy mobile web apps with ease'
    }, {
      description: 'Built live preview web component reflecting instantaneous feedback for user interaction'
    }, {
      description: 'Architected and implemented back end system for Mobile Engagements to facilitate dynamic persistence and deployment requirements for scaling mobile web apps'
    }, {
      description: 'Created theme management system to improve designing experience across multiple web apps'
    }, {
      description: 'Developed social media modules for integration to Facebook, Twitter and Twilio'
    }],
    logo: {
      name: 'Versatile-Logo',
      url: 'images/Versatile-Logo.png',
      height: '50px',
      linkUrl: 'http://www.versatile.com'
    }
  }, {
    company: 'Concurrent Technologies Corporation (CTC)',
    start: '2013-05-01',
    end: '2013-03-15',
    title: 'Software Engineer',
    details: [{
      description: 'Backend Java development for RESTful and SOAP web services to facilitate communication to RDF stores and SQL databases'
    }, {
      description: 'Developed custom ORM to handle dynamic data and ease persistence integration'
    }, {
      description: 'Built frontend thick web client to visualize data and provide user interface to handle system tasks'
    }, {
      description: 'Maintained virtual machine running AllegroGraph Triple Store and for communication with Glassfish server'
    }, {
      description: 'Experience with setting up, maintaining, and running data queries on Postgres SQL Databases'
    }, {
      description: 'Developed frontend and backend capabilities inventory system to help manage CTC’s workforce'
    }, {
      description: 'Used Git and SVN version control to maintain code base and progress between team members'
    }, {
      description: 'Limited experience with ontology development to help define RDF structure for Allegrograph'
    }],
    logo: {
      name: 'CTC-Logo',
      url: 'images/CTC-Logo.png',
      height: '75px',
      linkUrl: 'http://www.ctc.com'
    }
  }, {
    company: 'Concurrent Technologies Corporation (CTC)',
    start: '2011-09-11',
    end: '2012-05-01',
    title: 'Intern',
    details: [{
      description: 'Java Development Covering: abstraction, dependency injection, generics, inheritance, persistence, recursion, security, design patterns and strategies '
    }, {
      description: 'Code documentation using Java-Docs'
    }, {
      description: 'Code testing and integration using Junit framework '
    }, {
      description: 'Developed web interface and backend system for scheduling Java system tasks'
    }, {
      description: 'Developed iOS mobile app prototype to visualize geographic data using CoreData, Mapkit and Augmented Reality'
    }],
    logo: {
      name: 'CTC-Logo',
      url: 'images/CTC-Logo.png',
      height: '75px',
      linkUrl: 'http://www.ctc.com'
    }
  }],
  skills: [{
    name: 'HTML5',
    xp: 1100
  }, {
    name: 'JavaScript',
    xp: 1050
  }, {
    name: 'AngularJS',
    xp: 1025
  }, {
    name: 'Bootstrap CSS',
    xp: 1000
  }, {
    name: 'NodeJS',
    xp: 900
  }, {
    name: 'Java',
    xp: 840
  }, {
    name: 'CSS3',
    xp: 820
  }, {
    name: 'Jquery',
    xp: 800
  }, {
    name: 'MongoDB',
    xp: 750
  }, {
    name: 'Linux',
    xp: 700
  }, {
    name: 'ExpressJS',
    xp: 680
  }, {
    name: 'Spring',
    xp: 650
  }, {
    name: 'J2EE (Glassfish)',
    xp: 600
  }, {
    name: 'JUnit Testing',
    xp: 400
  }, {
    name: 'GruntJS',
    xp: 180
  }, {
    name: 'JavaDocs',
    xp: 170
  }, {
    name: 'iOS',
    xp: 150
  }, {
    name: 'Karma Testing',
    xp: 120
  }, {
    name: 'Ubuntu',
    xp: 60
  }, {
    name: 'LevelDB',
    xp: 50
  }]
});

(function(module) {
try {
  module = angular.module('my-site.templates');
} catch (e) {
  module = angular.module('my-site.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/showcase/showcase.html',
    '<header class="hero-unit" id="overview"><div class="container"><h4 class="header"><a href="{{module.gitUrl}}" target="blank">{{module.name}}</a></h4><h5 class="header">{{module.description}}</h5></div></header><ng-include src="module.url" class="fade-in"></ng-include>');
}]);
})();

angular.module('my.site.controllers').
config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/about', {
      templateUrl: 'views/about/about.html',
      controller: 'AboutCtrl'
    });
  }
]).
controller('AboutCtrl', ['$scope', '$interval',
  function($scope, $interval) {
    var birthday = moment("May 18, 1990");
    $scope.seconds = Math.floor(moment().diff(birthday) / 1000);
    $scope.years = Math.floor($scope.seconds / 31536000);
    $interval(function() {
      $scope.seconds++;
    }, 1000);
  }
]);

(function(module) {
try {
  module = angular.module('my-site.templates');
} catch (e) {
  module = angular.module('my-site.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/showcase/drag-drop/drag-drop.html',
    '<div class="row" ng-controller="DragDropCtrl"><div class="col-md-12" style="border:solid black 1px"><h4 class="header">Droppables</h4><h4>Images</h4><span ng-repeat="media in mediaFiles.images"><img class="media-image" ng-model="media" ng-src="{{media.url}}" tooltip="{{media.name}}" tooltip-popup-delay="200" ng-draggable=""></span><h4>Videos</h4><span ng-repeat="media in mediaFiles.videos"><video class="media-video" ng-model="media" ng-src="{{media.url}}" tooltip="{{media.name}}" tooltip-popup-delay="200" ng-draggable=""></video></span></div><div class="col-md-5"><h4 class="header">I Take Anything</h4><div class="drop1" ng-droppable="drop1"><span ng-repeat="item in drop1List track by $index"><ng-switch on="item.type.toLowerCase()"><span ng-switch-when="header"><p ng-model="item" ng-style="model.theme.header">{{item.data}}</p></span> <span ng-switch-when="text"><p ng-model="item">{{item.data}}</p></span> <span ng-switch-when="image"><img class="media-image-dropped" ng-model="item" ng-src="{{item.url}}"></span> <span ng-switch-when="video"><video ng-model="item" width="260" height="240" ng-src="{{item.url}}" class="media-video-dropped" controls=""></video></span> <span ng-switch-when="url"><p><a ng-model="item" class="hoverable-link" ng-href="{{\'http://\' + item.data}}" target="_blank" ng-style="model.the.text">{{item.data}}</a></p></span> <span ng-switch-when="telephone"><p><a ng-model="item" class="hoverable-link" ng-href="{{\'tel:+\' + toNumbers(item.data)}}" ng-style="model.theme.text{{item.data}}"></a></p></span> <span ng-switch-when="pdf"><p><a ng-model="item" class="hoverable-link" ng-href="{{item.data.url}}" target="_blank" ng-style="model.theme.text{{item.data.name}}"></a></p></span> <span ng-switch-when="spacer"></span></ng-switch></span></div></div><div class="col-md-5 col-md-offset-2"><h4 class="header">I am limited to images only!</h4><div class="drop2" ng-droppable="drop2" media-types="[\'image\']"><span ng-repeat="item in drop2List track by $index"><ng-switch on="item.type.toLowerCase()"><span ng-switch-when="header"><p ng-model="item" ng-style="model.theme.header">{{item.data}}</p></span> <span ng-switch-when="text"><p ng-model="item">{{item.data}}</p></span> <span ng-switch-when="image"><img class="media-image-dropped" ng-model="item" ng-src="{{item.url}}"></span> <span ng-switch-when="video"><video ng-model="item" width="260" height="240" ng-src="{{item.url}}" class="media-video-dropped" controls=""></video></span> <span ng-switch-when="url"><p><a ng-model="item" class="hoverable-link" ng-href="{{\'http://\' + item.data}}" target="_blank" ng-style="model.the.text">{{item.data}}</a></p></span> <span ng-switch-when="telephone"><p><a ng-model="item" class="hoverable-link" ng-href="{{\'tel:+\' + toNumbers(item.data)}}" ng-style="model.theme.text{{item.data}}"></a></p></span> <span ng-switch-when="pdf"><p><a ng-model="item" class="hoverable-link" ng-href="{{item.data.url}}" target="_blank" ng-style="model.theme.text{{item.data.name}}"></a></p></span> <span ng-switch-when="spacer"></span></ng-switch></span></div></div></div>');
}]);
})();

angular.module('my.site.controllers').
config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/contact', {
      templateUrl: 'views/contact/contact.html',
      controller: 'ContactCtrl'
    });
  }
]).
controller('ContactCtrl', ['$scope', function($scope){

}]);

(function(module) {
try {
  module = angular.module('my-site.templates');
} catch (e) {
  module = angular.module('my-site.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/showcase/font-select/font-select.html',
    '<div class="row" ng-controller="FontSelectCtrl"><div class="col-md-6"><font-group fonts="fonts" font="myFont"></font-group><span ng-style="{\'fontFamily\': myFont}">Selected Font: {{myFont}}</span></div><div class="col-md-6"><div class="input-group" style="width:200px"><input type="text" class="form-control" ng-model="newFont" placeholder="Add a Font" ng-style="{\'fontFamily\': newFont}" style="height:35px;"> <span class="input-group-btn" ng-model="newFont"><button class="btn btn-default" type="button" ng-click="addFont()"><i class="glyphicon glyphicon-plus"></i></button></span></div></div></div>');
}]);
})();

angular.module('my.site.controllers').
config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'views/home/home.html',
      controller: 'HomeCtrl'
    });
  }
]).
controller('HomeCtrl', ['$scope', function($scope) {

}]);

(function(module) {
try {
  module = angular.module('my-site.templates');
} catch (e) {
  module = angular.module('my-site.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/showcase/message-center/message-center.html',
    '<div class="row" ng-controller="MessageCenterCtrl"><div class="col-md-6"><div><input type="text" class="form-control" ng-model="msg"> <label style="cursor:pointer"><input type="checkbox" ng-model="important" style="cursor:pointer"> Important</label> <label style="cursor:pointer"><select ng-model="color" ng-options="color for color in colors | orderBy:\'toString()\'"></select>Color</label> <label style="cursor:pointer"><input type="number" class="form-control" ng-model="max" min="1"> Max <span class="subtle">(Enforced at time of broadcast)</span></label></div><div style="margin-top:10px"><button class="btn btn-primary" ng-click="broadcast()">Broadcast</button></div></div><div class="col-md-6"><h4 class="header">Message Center History</h4><pre>{{history | json}}</pre></div></div>');
}]);
})();

angular.module('my.site.controllers').
config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/resume', {
      templateUrl: 'views/resume/resume.html',
      controller: 'ResumeCtrl'
    });
  }
]).
controller('ResumeCtrl', ['$scope', '$resume',
  function($scope, $resume) {
    $scope.resume = $resume;
  }
]);

angular.module('my.site.controllers').
config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/showcase', {
      templateUrl: 'views/showcase/showcase.html',
      controller: 'ShowcaseCtrl'
    });
  }
]).
controller('ShowcaseCtrl', ['$scope', 'ModuleService',
  function($scope, ModuleService) {
    $scope.moduleService = ModuleService;

    $scope.$watch('moduleService.getModule()', function(newValue) {
      $scope.module = newValue;
    });
  }
]);

angular.module('my.site.controllers').
controller('DragDropCtrl', ['$scope', 'MessageService',
  function($scope, MessageService) {
    $scope.mediaFiles = {
      images: [{
        name: 'itunes',
        type: 'image',
        url: 'images/test-image-1.png'
      }, {
        name: 'play-fish',
        type: 'image',
        url: 'images/test-image-2.png'
      }, {
        name: 'wordpress',
        type: 'image',
        url: 'images/test-image-3.png'
      }, {
        name: 'candy-swirl',
        type: 'image',
        url: 'images/test-image-4.png'
      }],
      videos: [{
        name: 'test-video',
        type: 'video',
        url: 'videos/test.mp4'
      }]
    };

    $scope.drop1List = [];
    $scope.drop2List = [];

    $scope.drop1 = function(data) {
      $scope.drop1List.push(data);
      MessageService.info('Dropped in 1!');
    };

    $scope.drop2 = function(data) {
      $scope.drop2List.push(data);
      MessageService.info('Dropped in 2!');
    };
  }
]);

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

angular.module('my.site.controllers').
controller('MessageCenterCtrl', ['$scope', '$location', '$timeout', 'MessageService',
  function($scope, $location, $timeout, MessageService) {
    MessageService.clearHistory();
    $scope.msg = 'Broadcast me!';
    $scope.colors = ['success', 'info', 'danger', 'primary', 'warning', 'none'];
    $scope.color = $scope.colors[5];
    $scope.max = 3;

    $scope.$watch('max', function(newValue, oldValue) {
      if (angular.isNumber(newValue)) {
        MessageService.configure({
          max: newValue
        });
      }
    });

    $scope.broadcast = function() {
      var opts = {
        important: $scope.important,
        color: ($scope.color !== 'none') ? $scope.color : undefined
      };
      MessageService.broadcast($scope.msg, opts);
    };

    var timers = [];

    timers.push($timeout(function() {
      MessageService.broadcast('Here is a regular message');
    }, 200));

    timers.push($timeout(function() {
      MessageService.broadcast('And this is an important message!', {
        important: true
      });
    }, 3000));

    timers.push($timeout(function() {
      MessageService.broadcast('Colors are also supported! - Success', {
        color: 'success'
      });
    }, 5500));

    timers.push($timeout(function() {
      MessageService.broadcast('Danger', {
        color: 'danger',
        important: true
      });
    }, 6500));

    timers.push($timeout(function() {
      MessageService.broadcast('Info', {
        color: 'info'
      });
    }, 7300));

    timers.push($timeout(function() {
      MessageService.broadcast('Primary', {
        color: 'primary'
      });
    }, 7800));

    timers.push($timeout(function() {
      MessageService.broadcast('Warning, and the max is set to 3!', {
        color: 'warning'
      });
    }, 8300));

    $scope.messageService = MessageService;

    $scope.$watch('messageService.getHistory()', function(newValue, oldValue) {
      $scope.history = newValue;
    });

    $scope.location = $location;

    $scope.$watch('location.path() + module.name', function(newValue, oldValue) {
      if ($location.path() !== '/showcase' || $scope.module.name !== 'Message Center') {
        for (var i = 0; i < timers.length; i++) {
          $timeout.cancel(timers[i]);
          MessageService.clearHistory();
        }
      }
    });
  }
]);
