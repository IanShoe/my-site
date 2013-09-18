var mySiteDirectives = angular.module('mySite.directives', []);

mySiteDirectives.
directive('xpBar', function($timeout){

	var XP = function(value){

		if(value > 1800){
			this.level = 'Master';
			this.stars = new Array(5);
		}
		else if(value > 1400){
			this.level = 'Expert';
			this.stars = new Array(4);
		}
		else if(value > 800){
			this.level = 'Advanced';
			this.stars = new Array(3);
		}
		else if(value > 200){
			this.level = 'Skilled';
			this.stars = new Array(2);
		}
		else{
			this.level = 'Beginner';
			this.stars = new Array(1);
		}
		var percent = value/20;
		this.style= {
			eWidth: percent + '%',
			width: '1px',
			backgroundColor: 'hsl(' + (percent / 100 * 220) + ', 100%, 60%)'
		}
	}

	return {
		scope: {
			name: '=',
			xp: '='
		},
		restrict: 'AE',
		template:	'<div class="xp-container">' +
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
			scope.$watch('xp', function(newValue){
				if(isFinite(newValue)) {
					scope.metadata = new XP(newValue);
					$timeout(function() {
						scope.metadata.style.width = scope.metadata.style.eWidth;
					}, 10);
				};
			});
		}
	};
});


// xp ranges
// 0-200 Beginner
// 201-800 Skilled
// 851-1400 Advanced
// 1401-1800 Expert
// 1801-2000 Master