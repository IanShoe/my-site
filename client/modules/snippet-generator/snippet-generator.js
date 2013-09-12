// This possibly might just end up being the way we generate everything for engagements.

var snippetGenerator = angular.module('SnippetGenerator', []);

var TYPES = {
	text: 'Text',
	image: 'Image',
	video: 'Video',
	url: 'URL'
};

snippetGenerator.factory('SnippetFactory', function() {
	var snippetFactory = {};

	snippetFactory.generate = function(snippets) {
		var template = '';
		for(var i =0; i < snippets.length; i++) {
			switch (snippets[i].type){
				case TYPES.text: {
					template += generateTextTemplate(i);
					break;
				}
				case TYPES.image: {
					template += generateImageTemplate(i);
					break;
				}
				case TYPES.video: {
					template += generateVideoTemplate(i);
					break;
				}
				case TYPES.url: {
					template += generateUrlTemplate(i);
					break;
				}
				default: {
					console.error('Unknown Type');
				}
			}
		}
		return template;
	};

	function generateTextTemplate(index) {
		return '<p style="color:{{textColor}}">{{snippets[' + index + '].data}}</p>';
	}

	function generateImageTemplate(index) {
		return '<img src="{{snippets[' + index + '].data.url}}"></img><br><br>';
	};

	function generateVideoTemplate(index) {
		return '<video width="260" height="240" controls class="videoSel"> ' +
					'<source ng-src="{{snippets[' + index + '].data.url}}" type="{{snippets[' + index + '].data.type}}">' +
  				'</video>'
	};

	function generateUrlTemplate(index) {
		return '<p><a href="{{snippets[' + index + '].data}}"target="_blank">{{snippets[' + index + '].data}}</a></p>';
	}

	return snippetFactory;
});

snippetGenerator.directive('snippetGenerator', function($compile, SnippetFactory, $timeout) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			snippets: '=',
			textColor: '='
		},
		link: function(scope, elem, attrs) {
			scope.$watch('snippets.dirty', function(newValue, oldValue){
				if (newValue != oldValue) {
					linkItUp();
					// var videoElements = document.getElementsByClassName('videoSel');
					// for (var i = videoElements.length - 1; i >= 0; i--) {
					// 	videoElements[i].pause();
					// 	videoElements[i].load();
					// };
				};
			},true);

			function linkItUp(){
				var template = SnippetFactory.generate(scope.snippets);
				elem.html(template);
				$compile(elem.contents())(scope);
			}
			linkItUp();
		}
	}
});