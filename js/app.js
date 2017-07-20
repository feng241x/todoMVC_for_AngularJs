(function (angular) {
	'use strict';
	angular
		.module('todoApp',['ngRoute','todoApp.ctrl','todoApp.service'])
		.config(['$routeProvider',function($routeProvider){
			$routeProvider
				.when('/:status?',{
					// 路径相对于引用js页面
					templateUrl:'./views/todo.html',
					controller:'TodoController'
				})
		}])
})(angular);
