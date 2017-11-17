angular.module("wmodal", ["wmodal_spinner.html", "wmodal_service", "wmodal_modal.html"]);
angular.module("wmodal_spinner.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put("wmodal_spinner.html", "<div></div>");
}]);
angular.module("wmodal_modal.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put("wmodal_modal.html", "<div class='modal'><button>Close</button><ng-transclude>This is the default content of the modal</ng-transclude></div>");
}]);
angular.module("wmodal_service", [])
.service('wmodal', function($compile, $rootScope){
	"ngInject";
	this.modals = [];
	this.spinners = [];
	this.modal = function(obj){
		/*
		*	templateUrl
		*	controller
		*/
		if(!obj.id) obj.id = Date.now();
		let modal = '<wmodal id="'+obj.id+'" data="'+obj.data+'">';
		if(obj.template) modal += obj.template;
		else if(obj.templateUrl){
			modal += '<ng-include src="';
			modal += "'"+obj.templateUrl+"'";
			modal += '"></ng-include>';
		}
		modal += '</wmodal>';
		this.modals.push(obj);
		let body = angular.element(document).find('body').eq(0);
		body.append($compile(angular.element(modal))($rootScope));
	}
	this.spinner = function(obj){
		if(!obj.id) obj.id = Date.now();
		var spinner = '<wspinner id="'+obj.id+'">';
		spinner += '</wspinner>';
		this.spinners.push(obj);
		document.body.innerHTML += spinner;
	}
}).directive('wmodal', function() {
	"ngInject";
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			id: '@',
			data: '='
		},
		templateUrl: 'wmodal_modal.html'
	};
}).directive('wspinner', function() {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			id: '@'
		},
		templateUrl: 'wmodal_spinner.html'
	};
});