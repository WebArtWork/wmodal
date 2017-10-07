angular.module('wmodal', [])
.service('wmodal', function(){
	"ngInject";
	this.modals = [];
	this.spinners = [];
	this.modal = function(obj){
		/*
		*	templateUrl
		*	controller
		*/
		if(!obj.id) obj.id = Date.now();
		var modal = '<wmodal id="'+obj.id+'">';
		if(obj.template) modal += obj.template;
		else if(obj.templateUrl) modal += '<ng-include src="'+obj.templateUrl+'"></ng-include>';
		modal += '</wmodal>';
		this.modals.push(obj);
		document.body.innerHTML += modal;
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
			id: '@'
		},
		templateUrl: '/js/wmodal.html'
	};
}).directive('wspinner', function() {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			id: '@'
		},
		templateUrl: '/js/wspinner.html'
	};
});