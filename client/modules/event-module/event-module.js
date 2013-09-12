'use strict';

var eventModule = angular.module('EventModule', []);

eventModule.factory('EventService', function ($http) {
	var eventService = {};
	eventService.deviceUUID = null;
	eventService.sessionId = null;
	eventService.engStart = null;
	eventService.domain = null;

	eventService.sendStartEngagementEvent = function(startingPage, engType) {
		var eventType = 'mobileStartEngagement';
		var source = startingPage;
		var data = engType;
		var duration = 0;
		var eventObj = buildEvent(eventType, source, data, duration);
		uploadEvent(buildEventBundle(eventObj));
	};

	eventService.sendGAStartEngagementEvent = function(startingPage, guestAssistId) {
		var eventType = 'mobileStartEngagementViaGA';
		var source = startingPage;
		var data = guestAssistId;
		var duration = 0;
		var eventObj = buildEvent(eventType, source, data, duration);
		uploadEvent(buildEventBundle(eventObj));
	};

	eventService.sendEndEngagementEvent = function(endingPage) {
		var eventType = 'mobileEndEngagement';
		var source = endingPage;
		var data = null;
		var duration = (Date.now() - eventService.engStart);
		var eventObj = buildEvent(eventType, source, data, duration);
		uploadEvent(buildEventBundle(eventObj));
	};

	eventService.sendChangePageEvent = function(fromPage, toPage, pageStartTime) {
		var eventType = 'mobileChangePage';
		var source = fromPage;
		var data = toPage;
		var duration = (Date.now() - pageStartTime);
		var eventObj = buildEvent(eventType, source, data, duration);
		uploadEvent(buildEventBundle(eventObj));
	};

	eventService.sendSignUpEvent = function(signUpPageName, method, firstName, lastName, emailAddress) {
		var eventType = 'mobileSignUp';
		var source = signUpPageName;
		var data = {
			method: method,
			firstName: firstName,
			lastName: lastName,
			emailAddress: emailAddress
		};
		var duration = 0;
		var eventObj = buildEvent(eventType, source, data, duration);
		uploadEvent(buildEventBundle(eventObj));
	};

	eventService.sendRedeemCouponEvent = function(couponPageName, couponId, couponName) {
		var eventType = 'mobileRedeemCoupon';
		var source = couponPageName;
		var data = {
			couponId: couponId,
			couponName: couponName
		};
		var duration = 0;
		var eventObj = buildEvent(eventType, source, data, duration);
		uploadEvent(buildEventBundle(eventObj));
	};

	eventService.sendPageHelpEvent = function(pagingOption) {
		var eventType = 'mobilePageHelp';
		var source = 'help';
		var data = {
			pagingOption: pagingOption
		};
		var duration = 0;
		var eventObj = buildEvent(eventType, source, data, duration);
		uploadEvent(buildEventBundle(eventObj));
	};

	eventService.sendHelpDecision = function(decision) {
		var eventType = 'mobileHelpDecision';
		var source = 'help';
		var data = decision;
		var duration = 0;
		var eventObj = buildEvent(eventType, source, data, duration);
		uploadEvent(buildEventBundle(eventObj));
	};

	eventService.sendHelpRating = function(rating) {
		var eventType = 'mobileHelpRating';
		var source = 'help';
		var data = rating;
		var duration = 0;
		var eventObj = buildEvent(eventType, source, data, duration);
		uploadEvent(buildEventBundle(eventObj));
	};

	eventService.sendAnswerSurveyQuestionEvent = function(questionPageName, question, answers, pageStartTime) {
		var eventType = 'mobileAnswerSurveyQuestion';
		var source = questionPageName;
		var data = {
			question: question,
			answer: answers
		};
		var duration = (Date.now() - pageStartTime);
		var eventObj = buildEvent(eventType, source, data, duration);
		uploadEvent(buildEventBundle(eventObj));
	};

	eventService.sendChangeChannelEvent = function(channelPageName, deviceKey, channel, pageStartTime) {
		var eventType = 'mobileChangeChannel';
		var source = channelPageName;
		var data = {
			deviceKey: deviceKey,
			channel: channel
		};
		var duration = (Date.now() - pageStartTime);
		var eventObj = buildEvent(eventType, source, data, duration);
		uploadEvent(buildEventBundle(eventObj));
	};

	eventService.sendVoteChannelEvent = function(votePageName, deviceKey, channel, pageStartTime) {
		var eventType = 'mobileVoteChannel';
		var source = votePageName;
		var data = {
			deviceKey: deviceKey,
			channel: channel
		};
		var duration = (Date.now() - pageStartTime);
		var eventObj = buildEvent(eventType, source, data, duration);
		uploadEvent(buildEventBundle(eventObj));
	};

	eventService.sendPublishMediaWallEvent = function(mediaUploadPage, deviceKey, desc, pageStartTime) {
		var eventType = 'mobilePublishToMediaWall';
		var source = mediaUploadPage;
		var data = {
			deviceKey: deviceKey,
			description: desc
		};
		var duration = 0;
		var eventObj = buildEvent(eventType, source, data, duration);
		uploadEvent(buildEventBundle(eventObj));
	};

	function buildEvent(eventType, source, data, duration) {
		return {
			locale: {
				countryCode: 'US',
				languageCode: 'EN',
				variant: null
			},
			sessionId: eventService.sessionId,
			application: 'mobile-engagements',
			domain: eventService.domain,
			type: eventType,
			source: source,
			data: data,
			startDate: new Date().getTime(),
			duration: duration,
		};
	}

	function buildEventBundle(eventObj) {
		return {
			deviceUUID: eventService.deviceUUID,
			event: eventObj
		};
	}

	function uploadEvent(eventBundle) {
		var eventBundleJson = angular.toJson(eventBundle);

		var successCb = function() {
			console.log('Event uploaded successfully.')
		};

		var errorCb = function() {
			console.log('Error sending event.');
		};

		var eventUploadUrl = '/mobile-engagements/customer/event';
		$http.post(eventUploadUrl, eventBundleJson).success(successCb).error(errorCb);
	}

	return eventService;
});