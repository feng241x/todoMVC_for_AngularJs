(function(angular){
	'use strict';
	angular
		.module('todoApp.ctrl',[])
		.controller('TodoController',['$scope','$location','todoSrv',TodoController])

		function TodoController ($scope,$location,todoSrv){
			// 1、展示任务列表
			var vm = $scope;
			
			vm.todoList = todoSrv.getData();

			// 2、添加任务
			vm.taskName = ''; //任务名称
			vm.add = function (){
				if(vm.taskName.trim()===''){
					return;
				}
				todoSrv.add(vm.taskName);
				vm.taskName = '';
			}

			// 3、删除一条任务
			vm.del = todoSrv.del;

			// 4、修改一条任务
			// 双击某个任务 将当前项的id赋值为 editingId 此时引起了数据的变化
			// 页面中与 editingId 相关的指令都会被重新计算 那么 editingId === todoid
			// 当前双击的这一项 id 就与 editingId 相同了 那么当前项就会添加类
			vm.editingId = -1;
			vm.edit = function (id){
				vm.editingId = id;
			};
			// 编辑本文框通过 todo.name 与数据双向绑定 当我们在视图中修改了任务名称以后
			// 然后数据会自动发生变化
			// 敲回车 执行 vm.editingId = -1, 数据发生变化 重新计算 editingId === todo.id
			// 此时所有任务项的id 与 editingId 都不相同 所以元素都移除这个类
			vm.editSave = function(){
				vm.editingId = -1;
				// 修改完数据后 保存数据
				todoSrv.save();
			}

			// 5、切换任务选中状态
			vm.isCheckedAll = false;
			vm.checkAll = function(){
				todoSrv.checkAll(vm.isCheckedAll);
			};

			// 6、清除已完成任务
			vm.delCompleted = todoSrv.delCompleted;
			
			// 6.1 控制清除任务按钮的显示和隐藏
			vm.isShow = todoSrv.isShow;

			// 7、显示未完成任务数
			vm.getCount = todoSrv.getCount;
			
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
})(angular)