function indexCtrl ($scope, $location, MessageService, ModuleService){

	$scope.modules = ModuleService.getModules();

	$scope.navClick = function(){
		$(".navbar-collapse").removeClass("in").addClass("collapse");
	}

	$scope.gotoModule = function(module){
		ModuleService.setModule(module);
		$scope.navClick();
		$location.path('/module');
	}

	$scope.location = $location;

	$scope.$watch('location.path()', function(newValue, oldValue){
		$scope.activeNav = newValue.split('/')[1];
	});
}

function homeCtrl ($scope){
	
}

function aboutCtrl ($scope){
	var birthday = moment("May 18, 1990");
	$scope.seconds = Math.floor(moment().diff(birthday)/1000);
	$scope.years = Math.floor($scope.seconds/31536000);
	setInterval(function() {
		$scope.$apply(function(){
			$scope.seconds++;
		});
	}, 1000); 
}

function contactCtrl ($scope){
	
}

function resumeCtrl ($scope){
	$scope.resume = {
		name: 'Ian Shintaro Shoemaker',
		email: 'iss90g@gmail.com',
		tel: '814-421-2872',
		occupation: 'Software Engineer',
		address: {
			street: '522 Boston Court',
			state: 'PA',
			city: 'Mecahnicsburg',
			zip: 17050
		},
		objective: 'A software engineer with 2 years of experience building dynamic and scalable systems using Spring, J2EE and NodeJS backend technologies as well as web clients to facilitate data capture and analysis. Proficient in HTML5/CSS3, AngularJS and Bootstrap cutting edge web technologies to build both desktop and mobile ready web applications. Has experience and passion in creating clear, concise, and reusable modules to architect elegant solutions.',
		education: {
			colleges: [{
				name: 'University of Pittsburgh',
				degree: 'Bachelor of Science',
				graduation: '2012-05-01',
				courses: [{name:'Artificial Intelligence'},
				{name:'Embedded Systems'},
				{name:'Database Management Systems'},
				{name:'Knowledge Discovery in Databases (Data Mining)'},
				{name:'Mobile Applications (iOS)'},
				{name:'Web Programming'}],
				logo: {
					name: 'Pitt-Logo',
					url: 'resources/images/Pitt-Logo.png',
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
			details: [{description:'Developed and maintained URL shortening and redirection service for both customer and internal use'},
			{description:'Architected and implemented web app (Mobile Engagements) allowing users to build, customize and deploy mobile web apps with ease'},
			{description:'Built live preview web component reflecting instantaneous feedback for user interaction'},
			{description:'Architected and implemented back end system for Mobile Engagements to facilitate dynamic persistence and deployment requirements for scaling mobile web apps'},
			{description:'Created theme management system to improve designing experience across multiple web apps'},
			{description:'Developed social media modules for integration to Facebook, Twitter and Twilio'}],
			logo: {
				name: 'Versatile-Logo',
				url: 'resources/images/Versatile-Logo.png',
				height: '50px',
				linkUrl: 'http://www.versatile.com'
			}
		},
		{
			company: 'Concurrent Technologies Corporation (CTC)',
			start: '2013-05-01',
			end: '2013-03-15',
			title: 'Software Engineer',
			details: [{description:'Backend Java development for RESTful and SOAP web services to facilitate communication to RDF stores and SQL databases'},
			{description:'Developed custom ORM to handle dynamic data and ease persistence integration'},
			{description:'Built frontend thick web client to visualize data and provide user interface to handle system tasks'},
			{description:'Maintained virtual machine running AllegroGraph Triple Store and for communication with Glassfish server'},
			{description:'Experience with setting up, maintaining, and running data queries on Postgres SQL Databases'},
			{description:'Developed frontend and backend capabilities inventory system to help manage CTC’s workforce'},
			{description:'Used Git and SVN version control to maintain code base and progress between team members'},
			{description:'Limited experience with ontology development to help define RDF structure for Allegrograph'}],
			logo: {
				name: 'CTC-Logo',
				url: 'resources/images/CTC-Logo.png',
				height: '75px',
				linkUrl: 'http://www.ctc.com'
			}
		},
		{
			company: 'Concurrent Technologies Corporation (CTC)',
			start: '2011-09-11',
			end: '2012-05-01',
			title: 'Intern',
			details: [{description:'Java Development Covering: abstraction, dependency injection, generics, inheritance, persistence, recursion, security, design patterns and strategies '},
			{description:'Code documentation using Java-Docs'},
			{description:'Code testing and integration using Junit framework '},
			{description:'Developed web interface and backend system for scheduling Java system tasks'},
			{description:'Developed iOS mobile app prototype to visualize geographic data using CoreData, Mapkit and Augmented Reality'}],
			logo: {
				name: 'CTC-Logo',
				url: 'resources/images/CTC-Logo.png',
				height: '75px',
				linkUrl: 'http://www.ctc.com'
			}
		}],
		skills: [{
			name: 'HTML5',
			xp: 1100
		},
		{
			name: 'JavaScript',
			xp: 1050
		},
		{
			name: 'AngularJS',
			xp: 1025
		},
		{
			name: 'Bootstrap CSS',
			xp: 1000
		},
		{
			name: 'NodeJS',
			xp: 900
		},
		{
			name: 'Java',
			xp: 840
		},
		{
			name: 'CSS3',
			xp: 820
		},
		{
			name: 'Jquery',
			xp: 800
		},
		{
			name: 'MongoDB',
			xp: 750
		},
		{
			name: 'Linux',
			xp: 700
		},
		{
			name: 'ExpressJS',
			xp: 680
		},
		{
			name: 'Spring',
			xp: 650
		},
		{
			name: 'J2EE (Glassfish)',
			xp: 600
		},
		{
			name: 'JUnit Testing',
			xp: 400
		},
		{
			name: 'GruntJS',
			xp: 180
		},
		{
			name: 'JavaDocs',
			xp: 170
		},
		{
			name: 'iOS',
			xp: 150
		},
		{
			name: 'Karma Testing',
			xp: 120
		},
		{
			name: 'Ubuntu',
			xp: 60
		},
		{
			name: 'LevelDB',
			xp: 50
		}]
	};
}

function moduleCtrl ($scope, ModuleService){
	$scope.moduleService = ModuleService;

	$scope.$watch('moduleService.getModule()', function(newValue){
		$scope.module = newValue;
	});
}


function messageCtrl ($scope, $location, $timeout, MessageService){
	$scope.msg = 'Broadcast me!'

	$scope.broadcast = function(){
		MessageService.broadcast($scope.msg, {important: $scope.important});
	}

	var timers = [];

	timers.push($timeout(function(){
		MessageService.broadcast('Here is a regular message');
	}, 200))

	timers.push($timeout(function(){
		MessageService.broadcast('And this is an important message!', {important: true});
	}, 3000))

	timers.push($timeout(function(){
		MessageService.broadcast('Messages');
	}, 5000))

	timers.push($timeout(function(){
		MessageService.broadcast('Can Also');
	}, 6000))

	timers.push($timeout(function(){
		MessageService.broadcast('Be Small');
	}, 7000))

	timers.push($timeout(function(){
		MessageService.broadcast('Or they can be fairly large with lots of words like me!');
	}, 9500))

	$scope.messageService = MessageService;

	$scope.$watch('messageService.history', function(newValue, oldValue){
		$scope.history = newValue;
	});

	$scope.location = $location;

	$scope.$watch('location.path() + module.name', function(newValue, oldValue){
		if($location.path() != '/module' || $scope.module.name != 'Message Center'){
			for(i = 0; i < timers.length; i++){
				$timeout.cancel(timers[i]);
				MessageService.clearHistory();
			}
		}
	});
}

function dragDropCtrl ($scope, MessageService){
	$scope.mediaFiles = {
		images: [{
			name: 'img1',
			type: 'image',
			url:'resources/images/test-image-1.png'
		},
		{
			name: 'img2',
			type: 'image',
			url:'resources/images/test-image-2.png'
		},
		{
			name: 'img3',
			type: 'image',
			url:'resources/images/test-image-3.png'
		},
		{
			name: 'img4',
			type: 'image',
			url:'resources/images/test-image-4.png'
		}]
	}

	$scope.drop1List = [];
	$scope.drop2List = [];

	$scope.drop1 = function(data){
		$scope.drop1List.push(data);
		MessageService.broadcast('Dropped in 1!')
	}

	$scope.drop2 = function(data){
		$scope.drop2List.push(data);
		MessageService.broadcast('Dropped in 2!')
	}
}