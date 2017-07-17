(function (angular) {
	'use strict';
	angular
		.module('todoApp',[])
		.controller('TodoController',['$scope',TodoController])

	function TodoController ($scope){
		// 1、展示任务列表
		var vm = $scope;
		var todoList = [
			{id:1,name:'抽烟',isCompleted:false},
			{id:2,name:'喝酒',isCompleted:true},
			{id:3,name:'烫头发',isCompleted:false},
		]
		vm.todoList = todoList;
	}
})(angular);
