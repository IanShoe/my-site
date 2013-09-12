angular.module('Previewer', []).
run(["$templateCache", function($templateCache) {
    $templateCache.put("template/previewer.html",
        '<span>' +
            '<div class="phone">' +
                '<div class="screen" style="background-image:url(\'{{model.screens[currentScreen.type].backgroundImage.url || model.theme.backgroundImage.url}}\');" ng-class="{\'phone-disabled\': model.screens[currentScreen.type].disabled}">' +
                    '<div class="back-dropzone back left" ng-droppable="backDrop" media-types="[\'image\']"></div>' +
                    '<div class="back-dropzone back right" ng-droppable="backDrop" media-types="[\'image\']"></div>' +
                    '<div class="inner-screen">' +
                        '<div style="margin-top:{{model.theme.topOffset}}px" class="centered-container">' +
                            '<span ng-show="!!modelScreen.decorators.top">' +
                                '<decorator decorators="modelScreen.decorators.top" id="top"></decorator>' +
                            '</span>' +
                            '<ng-include src="model.screens[currentScreen.type].url"></ng-include>' +
                            '<span ng-show="!!modelScreen.decorators.bottom">' +
                                '<decorator decorators="modelScreen.decorators.bottom" id="bottom"></decorator>' +
                            '</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="pagination pagination-centered">' +
                '<ul>' +
                    '<li ng-class="{disabled: currentScreen.index == 0}"><a ng-click="currentScreen.index == 0 || selectScreen(-2)" tooltip="First"><<</a></li>' +
                    '<li ng-class="{disabled: currentScreen.index == 0}"><a ng-click="currentScreen.index == 0 || selectScreen(currentScreen.index - 1)" tooltip="Previous"><</a></li>' +
                    '<li ng-class="{active: currentScreen.index == screen.index}" ng-repeat="screen in paginationScreens" ng-click="selectScreen(screen)">' +
                        '<a tooltip="{{screen.name}}">{{screen.index +1}}</a>' +
                    '</li>' +
                    '<li ng-class="{disabled: currentScreen.index == screens.length - 1}"><a ng-click="currentScreen.index == screens.length - 1 || selectScreen(currentScreen.index + 1)" tooltip="Next">></a></li>' +
                    '<li ng-class="{disabled: currentScreen.index == screens.length - 1}"><a ng-click="currentScreen.index == screens.length - 1 || selectScreen(-1)" tooltip="Last">>></a></li>' +
                '</ul>' +
            '</div>' +
        '</span>'
    );
    $templateCache.put("template/decorator.html",
        '<span>' +
            '<div class="decorator-dropzone" ng-droppable="decoratorDrop" index="0"></div>' +
            '<div ng-repeat="decorator in decorators track by $index">' +
                '<ng-switch on="decorator.type.toLowerCase()">' +
                    '<div ng-switch-when="header">' +
                        '<p ng-model="decorator" ng-draggable ng-style="model.theme.header">{{decorator.data}}</p>' +
                    '</div>' +
                    '<div ng-switch-when="text">' +
                        '<p ng-model="decorator">{{decorator.data}}</p>' +
                    '</div>' +
                    '<div ng-switch-when="image"><img ng-model="decorator" ng-draggable ng-src="{{decorator.url}}"></img><br></div>' +
                    '<div ng-switch-when="video">' +
                        '<video ng-model="decorator" ng-draggable width="260" height="240" ng-src="{{decorator.url}}" controls></video><br>' +
                    '</div>' +
                    '<div ng-switch-when="url">' +
                        '<p><a ng-model="decorator" ng-draggable class="hoverable-link" ng-href="{{\'http://\' + decorator.data}}" target="_blank" ng-style="model.theme.text">{{decorator.data}}</a></p>' +
                    '</div>' +
                    '<div ng-switch-when="telephone">' +
                        '<p><a ng-model="decorator" ng-draggable class="hoverable-link" ng-href="{{\'tel:+\' + toNumbers(decorator.data)}}" ng-style="model.theme.text">{{decorator.data}}</a></p>' +
                    '</div>' +
                    '<div ng-switch-when="pdf">' +
                        '<p><a ng-model="decorator" ng-draggable class="hoverable-link" ng-href="{{decorator.data.url}}" target="_blank" ng-style="model.theme.text">{{decorator.data.name}}</a></p>' +
                    '</div>' +
                    '<div ng-switch-when="spacer"><br></div>' +
                '</ng-switch>' +
                '<div class="decorator-dropzone" ng-droppable="decoratorDrop" index="{{$index + 1}}"></div>' +
            '</div>' +
        '</span>'
    );
}]).
factory('PreviewerService', function ($rootScope) {
    var previewerService = {
        config: {
            autoUpdateDisabled: false
        }
    };

    var breath = true;
    var optionIndex;

    var previewerScope = {};

    previewerService.initilize = function(scope){
        previewerScope = scope;
        breath = true;
        optionIndex = 0;
    }

    previewerService.configure = function(config){
        this.config.autoUpdateDisabled = angular.isDefined(config.autoUpdateDisabled) ? config.autoUpdateDisabled : this.config.autoUpdateDisabled;
    }

    previewerService.getOptionIndex = function(){
        return optionIndex;
    }

    previewerService.setOptionIndex = function(index){
        optionIndex = index;
    }
    
    previewerService.updateScreen = function (index, optIndex) {
        if(this.config.autoUpdateDisabled){
            return;
        }
        if (breath) {
            setTimeout(function() {
                breath = false;
            }, 0);
        }
        else{
            optIndex = parseInt(optIndex);
            if(!(isNaN(optIndex))){
                this.setOptionIndex(optIndex);
            }
            if(angular.isDefined(index)){
                // Figure out why this isn't working right and I have to $$phase check
                $rootScope.$$phase ? previewerScope.selectScreen(index) : $rootScope.$apply(previewerScope.selectScreen(index));
            }
        }
    };
    
    return previewerService;
}).
directive('phoneScreen', function(PreviewerService) {
    return {
        controller: 'phoneCtrl',
        replace: true,
        restrict: 'AE',
        scope: {
            model: '='
        },
        templateUrl: 'template/previewer.html',
        link: function($scope, element, attrs){
            PreviewerService.initilize($scope);
            $scope.$watch('model', function(newValue, oldValue) {
                if(newValue){
                    $scope.engagementJson = newValue;
                    $scope.selectScreen(0);
                }
            });

            var Screen = {
                splash: function(){this.name = 'Splash'; this.type = 'splash';},
                signUp: function(){this.name = 'Sign Up'; this.type = 'signUp';},
                registration: function(){this.name = 'Registration'; this.type = 'registration';},
                thanks: function(){this.name = 'Thanks'; this.type = 'thanks';},
                verify: function(){this.name = 'Verify'; this.type = 'verify';},
                reward: function(){this.name = 'Reward'; this.type = 'reward';},
                survey: function(){this.name = 'Survey'; this.type = 'survey';},
                answer: function(){this.name = 'Answer'; this.type = 'answer';},
                options: function(){this.name = 'Options'; this.type = 'options';},
                help: function(){this.name = 'Help'; this.type = 'help';},
                rating: function(){this.name = 'Rating'; this.type = 'rating';},
                mediaWallOptions: function(){this.name = 'Media Wall Options'; this.type = 'mediaWallOptions';},
                photoUpload: function(){this.name = 'Photo Upload'; this.type = 'photoUpload';},
                youtubeSearch: function(){this.name = 'Youtube Search'; this.type = 'youtubeSearch';},
                information: function(){this.name = 'Information'; this.type = 'information';},
                details: function(){this.name = 'Details'; this.type = 'details';}
            }

            $scope.optionTypes = {
                help: [new Screen.splash, new Screen.help, new Screen.rating],
                information: [new Screen.splash, new Screen.information, new Screen.details],
                mediaWall: [new Screen.splash, new Screen.mediaWallOptions, new Screen.photoUpload, new Screen.youtubeSearch],
                remoteControl: [new Screen.splash, new Screen.options],
                survey: [new Screen.splash, new Screen.survey, new Screen.answer, new Screen.signUp, new Screen.registration, new Screen.thanks, new Screen.verify, new Screen.reward],
                coupon: [new Screen.splash, new Screen.signUp, new Screen.registration, new Screen.thanks, new Screen.verify, new Screen.reward],
                kioskCoupon: [new Screen.signUp, new Screen.registration, new Screen.thanks]
            }

            for (var property in $scope.optionTypes) {
                for (var i = $scope.optionTypes[property].length - 1; i >= 0; i--) {
                    $scope.optionTypes[property][i].index = i;
                };
            }
        }
    }
}).
controller('phoneCtrl', ['$scope', function($scope){
    $scope.backDrop = function(data){
        $scope.engagementJson.screens[$scope.currentScreen.type].backgroundImage = data;
    }

    $scope.selectScreen = function(selection){
        if($scope.currentScreen && $scope.currentScreen.index === selection) {
            return;
        }
        $scope.screens = $scope.optionTypes[$scope.engagementJson.type];
        if(isFinite(selection)){
            if(selection == -2){
                // first
                $scope.selectScreen($scope.screens[0]);
            }
            else if (selection == -1){
                // last
                $scope.selectScreen($scope.screens[$scope.screens.length-1]);
            }
            else{
                $scope.selectScreen($scope.screens[selection]);
            }
        }
        else{
            $scope.currentScreen = selection;
        }
    };

    // Do things here when screen updates
    $scope.$watch('currentScreen', function(newValue, oldValue){
        if(newValue === oldValue){
            return;
        }
        $scope.modelScreen = $scope.model.screens[newValue.type];
        // set pagination component
        if($scope.screens.length < 5 || $scope.currentScreen.index < 3){
            $scope.paginationScreens = $scope.screens.slice(0,5);
        }
        else if($scope.currentScreen.index > $scope.screens.length - 3) {
            $scope.paginationScreens = $scope.screens.slice(-5, $scope.screens.length);
        }
        else{
            $scope.paginationScreens = $scope.screens.slice($scope.currentScreen.index - 2 , $scope.currentScreen.index + 3);
        }
    });
}]).
directive('screenUpdate', function(PreviewerService, MessageService, $timeout) {
    return {
        link: function(scope, element, attrs) {
            if(element[0].tagName.toLowerCase() == 'select' || element.attr('type') == 'file' || element.attr('type') == 'checkbox'){
                element.bind('change', updateWrapper);
            }
            else if(element[0].tagName.toLowerCase() == 'button'){
                element.bind('click', updateWrapper);
            }
            else{
                element.bind('focus', updateWrapper);
                element.bind('keypress', updateWrapper);
            }
            function updateWrapper(){
                PreviewerService.updateScreen(attrs.screenUpdate, attrs.optionIndex);
            }
        }
    }
}).
service('DecoratorService', function($rootScope){
    var decorators = [];

    var decoratorService = {
        push : function(decorator, id){
            decorators.push({decorator: decorator, id: id});
        },
        drop : function(id){
            for(var i = 0; i < decorators.length; i++){
                var found = decorators[i].decorator.advancedFind(id, 'id');
                if(found){
                    decorators[i].decorator.splice(found.index, 1);
                }
            }
        }
    };

    return decoratorService;
}).
directive('decorator', function (DecoratorService){
    return {
        controller: function($scope){
            $scope.decoratorDrop = function(data){
                if(data.id){
                    // if it exists in this decorators list, move it
                    var found = $scope.decorators.advancedFind(data, 'id');
                    if(found.item){
                        $scope.decorators.move(found.index, data.index);
                        for(var i = 0; i < $scope.decorators.length; i++){
                            $scope.decorators[i].index = i;
                        }
                    }
                    // otherwise, remove it from other lists and add to this one
                    else{
                        DecoratorService.drop(data.id);
                        $scope.decorators.splice(data.index, 0, data);
                    }
                }
                else{
                    data.id = generateUUID();
                    isNaN(data.index) ? $scope.decorators.push(data) : $scope.decorators.splice(data.index, 0, data);
                }
            }
        },
        restrict: 'EA',
        templateUrl: 'template/decorator.html',
        scope: {
            decorators: '='
        },
        link : function(scope, elem, attrs){
            scope.id = attrs.id;
            scope.$watch('decorators', function(newValue, oldValue){
                if(newValue){
                    DecoratorService.push(scope.decorators, attrs.id);
                }
            })
        }
    }
});