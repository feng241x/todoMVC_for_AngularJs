(function (angular) {
	'use strict';
	angular
		.module('todoApp',[])
		.controller('TodoController',['$scope','$location',TodoController])

	function TodoController ($scope,$location){
		// 1、展示任务列表
		var vm = $scope;
		var todoList = [
			{id:1,name:'抽烟',isCompleted:false},
			{id:2,name:'喝酒',isCompleted:true},
			{id:3,name:'烫头',isCompleted:false}
		]
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

		// 3、删除一条任务
		vm.del = function(id) {
			todoList.splice(id,1);
			// for(var i=0;i<todoList.length;i++){
			// 	if(todoList[i].id === id){
			// 		todoList.splice(i,1);
			// 		return;
			// 	}
			// }
		}

		// 4、修改一条任务
		vm.editingId = -1;
		vm.edit = function (id){
			vm.editingId = id;
		};
		vm.editSave = function(){
			vm.editingId = -1;
		}

		// 5、切换任务选中状态
		vm.isCheckedAll = false;
		vm.checkAll = function (){
			console.log('123')
			//根据全选按钮选中状态 来控制所有任务项的选中状态
			for(var i=0;i<todoList.length;i++){
				todoList[i].isCompleted = vm.isCheckedAll;
			}
		}

		// 6、清除已完成任务
		vm.delCompleted = function(){
			//清空数组
			var tempArr = [];
			for(var i=0;i<todoList.length;i++){
				if(!todoList[i].isCompleted){
					tempArr.push(todoList[i])
				}
			}
			todoList.length = 0;
			[].push.apply(todoList,tempArr)
		}

		vm.isShow = function () {
			var ret = false;
			for(var i=0;i<todoList.length;i++){
				if(todoList[i].isCompleted){
					ret = true;
					break;
				}
			}
			return ret;
		}

		// 7、显示未完成任务数
		vm.getCount = function(){
			var count = 0;
			for(var i=0;i<todoList.length;i++){
				if(!todoList[i].isCompleted){
					count++;
				}
			}
			return count;
		}
		
		// 8、显示不同状态的任务
		vm.status = undefined;
		// vm.selectorAll = function(){
		// 	vm.status = undefined;
		// }
		// vm.selectorActive = function(){
		// 	vm.status = false;
		// }
		// vm.selectorCompleted = function(){
		// 	vm.status = true;
		// }

		// 9、根据url值来显示不同状态任务
		vm.location = $location;
		vm.$watch('location.url()',function(newV,oldV){
			switch(newV){
				case '/active':
					vm.status = false;
					break;
				case '/completed':
					vm.status = true;
					break;
				default:
					vm.status = undefined;
					break;
			}
		})
	}
})(angular);
