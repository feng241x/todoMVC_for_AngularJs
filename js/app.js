(function (angular) {
	'use strict';
	angular
		.module('todoApp',[])
		.controller('TodoController',['$scope',TodoController])

	function TodoController ($scope){
		// 1、展示任务列表
		var vm = $scope;
		var todoList = []
		vm.todoList = todoList;

		// 2、添加任务
		vm.taskName = ''; //任务名称
		vm.add = function (){
			if(vm.taskName.trim()===''){
				return;
			}
			var id,
				length = todoList.length;
				if(length<1){
					id=1;
				}else{
					id = todoList[todoList.length-1].id + 1;
				}
			todoList.push({id:id,name:vm.taskName,isCompleted:false})
			vm.taskName = '';
		}

	}
})(angular);
