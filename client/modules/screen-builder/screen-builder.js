var screenBuilder = angular.module('ScreenBuilder', []);

var TYPE = {
	input: 'input',
	textarea: 'textarea',
	imageUpload: 'imageUpload'
};

screenBuilder.factory('ScreenFactory', function() {
	var screenFactory = {};

	screenFactory.getTemplate = function(screenGadgets) {
		var template = '';

		for (var gadget in screenGadgets) {
			var ngModel = gadget.ngModel;		
			var type = gadget.type;

			if (type === TYPE.input) {
				var inputType = gadget.inputType;
				template += getInputTemplate(ngModel, inputType);
			} else if (type === TYPE.textarea) {
				template += getTextareaTemplate(ngModel);
			} else if (type === TYPE.imageUpload) {
				template += getImageUploadTemplate(ngModel);
			}

		}
	};

	function getImageUploadTemplate(ngModel) {
		var imageUploadTemplate = '';
		imageUploadTemplate += "<image-upload image-model="
	};

	function getTextareaTemplate(ngModel) {
		var textareaTemplate = '';
		textareaTemplate += "<textarea ng-model=\"" + ngModel + "\"></textarea>";
		return textareaTemplate;
	};

	function getInputTemplate(ngModel, inputType) {
		var inputTemplate = '';
		inputTemplate += "<input type=\"" + inputType + "\" ng-model=\"" + ngModel + "\" />";
		return inputTemplate;
	};


	return screenFactory;
});

screenBuilder.directive('screenBuilder', function($compile, ScreenFactory) {

	var linky = function(scope, elem, attrs) {
		// Get the template from the factory
		var template = ScreenFactory.getTemplate(scope.screenModel.screenGadgets);
		elem.html(template);

		// This should compile the template and link it to scope
		$compile(elem.contents())(scope);
	};

	return {
		restrict: 'E',
		replace: true,
		scope: {
			screenModel: '='
		},
		link: linky
	}
});

// for imageUpload tags, ngModel actually
// refers to imageModel

var list = {
	splash: {
		name: 'Splash Screen',
		type: 'Splash',
		togglable: false,
		screenGadgets: [
		{
			ngModel: 'splashImage',
			type: 'imageUpload'
		}]
	},
	signUp: {
		name: 'Sign Up',
		type: 'SignUp',
		togglable: true,
		emailButton: {},
		screenGadgets: [
		{
			ngModel: 'messageTitle',
			type: 'input',
			inputType: 'text'
		},
		{
			ngModel: 'messageBox',
			type: 'textarea',
		},
		{
			ngModel: 'emailButton.text',
			type: 'input',
			inputType: 'text'
		},
		{
			ngModel: 'emailButton.color',
			type: 'input',
			inputType: 'color'
		},
		{
			ngModel: 'faceBookButton.text',
			type: 'input',
			inputType: 'text'
		},
		{
			ngModel: 'faceBookButton.color',
			type: 'input',
			inputType: 'color'
		}]
	},
	registration: {
		name: 'Registration',
		type: 'Registration',
		togglable: true,
		screenGadgets: [
		{
			ngModel: 'messageBox',
			type: 'textarea'
		},
		{
			ngModel: 'emailInput',
			type: 'input',
			inputType: 'email'
		},
		{
			ngModel: 'passwordInput',
			type: 'input',
			inputType: 'password'
		}]
	},
	thanks: {
		name: 'Thanks',
		type: 'Thanks',
		togglable: false,
		screenGadgets: [
		{
			ngModel: 'messageBox',
			type: 'textarea'
		}]
	},
	verify: {
		name: 'Verify',
		type: 'Verify',
		togglable: true,
		screenGadgets: [
		{
			ngModel: 'messageBox',
			type: 'textarea'
		}]
	},
	reward: {
		name: 'Reward',
		type: 'Reward',
		togglable: true,
		screenGadgets: [
		{
			ngModel: 'messageBox',
			type: 'textarea'
		}]
	}
};