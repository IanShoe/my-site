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
				graduation: 'May 2012',
				courses: ['Artificial Intelligence',
				'Embedded Systems',
				'Database Management Systems',
				'Knowledge Discovery in Databases (Data Mining)',
				'Mobile Applications(iOS)',
				'Web Programming']
			}]
		},
		jobs: [{
			company: 'Versatile Systems, Inc.',
			start: 'April 2013',
			end: 'September 2013',
			title: 'Software Engineer',
			list: ['Developed and maintained URL shortening and redirection service for both customer and internal use',
			'Architected and implemented web app (Mobile Engagements) allowing users to build, customize and deploy mobile web apps with ease',
			'Architected and implemented back end system for Mobile Engagements to facilitate dynamic persistence and deployment requirements for scaling mobile web apps',
			'Created theme management system to improve designing experience across multiple web apps',
			'Developed social media modules for integration to Facebook, Twitter and Twilio']
		},
		{
			company: 'Concurrent Technologies Corporation (CTC)',
			start: 'May 2012',
			end: 'April 2013',
			title: 'Software Engineer',
			list: ['Backend Java development for RESTful and SOAP web services to facilitate communication to RDF stores and SQL databases',
			'Developed custom ORM to handle dynamic data and ease persistence integration',
			'Built frontend thick web client to visualize data and provide user interface to handle system tasks',
			'Maintained virtual machine running AllegroGraph Triple Store and for communication with Glassfish server',
			'Experience with setting up, maintaining, and running data queries on Postgres SQL Databases',
			'Developed frontend and backend capabilities inventory system to help manage CTC’s workforce',
			'Used Git and SVN version control to maintain code base and progress between team members',
			'Limited experience with ontology development to help define RDF structure for Allegrograph']
		},
		{
			company: 'Concurrent Technologies Corporation (CTC)',
			start: 'September 2011',
			end: 'May 2012',
			title: 'Intern',
			list: ['Java Development Covering: abstraction, dependency injection, generics, inheritance, persistence, recursion, security, design patterns and strategies ',
			'Code documentation using Java-Docs',
			'Code testing and integration using Junit framework ',
			'Developed web interface and backend system for scheduling Java system tasks',
			'Developed iOS mobile app prototype to visualize geographic data using CoreData, Mapkit and Augmented Reality']
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
			name: 'LevelDB',
			xp: 50
		}]
	};
}

function moduleCtrl ($scope, ModuleService){
	$scope.module = ModuleService.getModule();
}