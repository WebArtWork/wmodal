angular.module("wmodal_service", [])
.service('wmodal', function($compile, $rootScope){
	"ngInject";
	/*
	*	Modals
	*/
		this.modals = [];
		this.modal_link = function(scope, el){
			scope.close = function(){
				for (var i = 0; i < this.modals.length; i++) {
					if(this.modals[i].id==scope.id){
						this.modals.splice(i, 1);
						break;
					}
				}
				if(this.modals.length == 0){
					angular.element(document).find('html').removeClass('noscroll');
				}
				if(scope.cb) scope.cb();
				el.remove();
			}
			for (var i = 0; i < this.modals.length; i++) {
				if(this.modals[i].id==scope.id){
					this.modals[i].close = scope.close;
					scope._data = this.modals[i];
					for(var key in this.modals[i]){
						scope[key] = this.modals[i][key];
					}
					break;
				}
			}
		}
		this.modal = function(obj){
			if(!obj.id) obj.id = Date.now();
			var modal = '<wmodal id="'+obj.id+'">';
			if(obj.template) modal += obj.template;
			else if(obj.templateUrl){
				modal += '<ng-include src="';
				modal += "'"+obj.templateUrl+"'";
				modal += '" ng-controller="wparent"></ng-include>';
			}
			modal += '</wmodal>';
			this.modals.push(obj);
			var body = angular.element(document).find('body').eq(0);
			body.append($compile(angular.element(modal))($rootScope));
			angular.element(document).find('html').addClass('noscroll');
		}
	/*
	*	Morphs
	*/

	/*
	*	Popups
	*/
		this.popups = [];
		this.popup_link = function(scope, el){
			scope.close = function(){
				for (var i = 0; i < this.popups.length; i++) {
					if(this.popups[i].id==scope.id){
						this.popups.splice(i, 1);
						break;
					}
				}
				if(this.popups.length == 0){
					angular.element(document).find('html').removeClass('noscroll');
				}
				if(scope.cb) scope.cb();
				el.remove();
			}
			for (var i = 0; i < this.popups.length; i++) {
				if(this.popups[i].id==scope.id){
					this.popups[i].close = scope.close;
					scope._data = this.popups[i];
					for(var key in this.popups[i]){
						scope[key] = this.popups[i][key];
					}
					break;
				}
			}
		}
		this.popup = function(obj){
			if(!obj.id) obj.id = Date.now();
			var modal = '<wpopup id="'+obj.id+'">';
			if(obj.template) modal += obj.template;
			else if(obj.templateUrl){
				modal += '<ng-include src="';
				modal += "'"+obj.templateUrl+"'";
				modal += '" ng-controller="wparent"></ng-include>';
			}
			modal += '</wpopup>';
			this.modals.push(obj);
			var body = angular.element(document).find('body').eq(0);
			body.append($compile(angular.element(modal))($rootScope));
			angular.element(document).find('html').addClass('noscroll');
		}
	/*
	*	Spinners
	*/
		this.spinners = [];
		this.spinner_link = function(scope, el){
			scope.close = function(){
				for (var i = 0; i < this.spinners.length; i++) {
					if(this.spinners[i].id==scope.id){
						this.spinners.splice(i, 1);
						break;
					}
				}
				if(this.spinners.length == 0){
					angular.element(document).find('html').removeClass('noscroll');
				}
				if(scope.cb) scope.cb();
				el.remove();
			}
			for (var i = 0; i < this.spinners.length; i++) {
				if(this.spinners[i].id==scope.id){
					this.spinners[i].close = scope.close;
					scope._data = this.spinners[i];
					for(var key in this.spinners[i]){
						scope[key] = this.spinners[i][key];
					}
					break;
				}
			}
		}
		this.spinner = function(obj){
			if(!obj.id) obj.id = Date.now();
			var modal = '<wspinner id="'+obj.id+'">';
			if(obj.template) modal += obj.template;
			else if(obj.templateUrl){
				modal += '<ng-include src="';
				modal += "'"+obj.templateUrl+"'";
				modal += '" ng-controller="wparent"></ng-include>';
			}
			modal += '</wspinner>';
			this.spinners.push(obj);
			var body = angular.element(document).find('body').eq(0);
			body.append($compile(angular.element(modal))($rootScope));
			angular.element(document).find('html').addClass('noscroll');
		}
	/*
	*	End of wmodal
	*/
}).directive('wmodal', function(wmodal) {
	"ngInject";
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			id: '@'
		}, link: wmodal.modal_link, templateUrl: 'wmodal_modal.html'
	};
}).directive('wpopup', function(wmodal) {
	"ngInject";
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			id: '@'
		}, link: wmodal.popup_link, templateUrl: 'wmodal_popup.html'
	};
}).directive('wspinner', function(wmodal) {
	"ngInject";
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			id: '@'
		}, link: wmodal.spinner_link, templateUrl: 'wmodal_spinner.html'
	};
}).controller('wparent', function($scope, $timeout) {
	"ngInject";
	$timeout(function(){
		if($scope.$parent.$parent._data){
			for (var key in $scope.$parent.$parent._data) {
				$scope[key] = $scope.$parent.$parent._data[key];
			}
		}
		if($scope.$parent._data){
			for (var key in $scope.$parent._data) {
				$scope[key] = $scope.$parent._data[key];
			}
		}
	});
});