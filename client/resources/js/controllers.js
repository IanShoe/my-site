function indexCtrl ($scope, $location, MessageService, ModuleService){

	$scope.modules=[{
		name: 'Message Center',
		description: 'Easy Notification System'
	}];

	$scope.gotoModule = function(module){
		ModuleService.setModule(module);
		$location.path('/module');
	}

	$scope.location = $location;

	$scope.$watch('location.path()', function(newValue, oldValue){
		$scope.activeNav = newValue.split('/')[1];
	});
}

function homeCtrl ($scope){
	$scope.home = 'Home';
}

function aboutCtrl ($scope){
	$scope.about = 'About';
}

function contactCtrl ($scope){
	$scope.contact = 'Contact';
}

function resumeCtrl ($scope){
	$scope.resume = {
		name: 'Ian Shintaro Shoemaker',
		email: 'iss90g@gmail.com',
		tel: '814-421-2872',
		education: {
			college: [{
				name: 'University of Pittsburgh',
				degree: 'Bachelor of Science',
				graduation: 'May 2012'
			}]
		}
	};
}

function moduleCtrl ($scope, ModuleService){
	$scope.module = ModuleService.getModule();
}