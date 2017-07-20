(function(angular){
	'use strict';
	angular
		.module('todoApp.ctrl',[])
		.controller('TodoController',['$scope','$location','$routeParams','todoSrv',TodoController])

		function TodoController ($scope,$location,$routeParams,todoSrv){
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
			// 路由执行的过程
			// 1、用户单击 active 这个a链接 改变url中的锚点值
			// 2、锚点值发生变化以后 angular 能够感知到这个变化 angular会监视锚点值得变化
			// 3、此时 路由机制就会根据当前的锚点值 重新匹配路由规则
			// 4、 当某个路由规则匹配以后 angular会吧这个规则对应的视图内容通过ajax
			//     请求获取到 并且展示到页面中 (ng-view)
			// 5、这个规则对应的控制器中的代码也会被执行
			var status = $routeParams.status;
			switch(status){
				case 'active':
					vm.status = false;
					break;
				case 'completed':
					vm.status = true;
					break;
				default:
					vm.status = undefined;
					break;
			}
			// 9、根据url值来显示不同状态任务
			// vm.location = $location;
			// vm.$watch('location.url()',function(newV,oldV){
			// 	switch(newV){
			// 		case '/active':
			// 			vm.status = false;
			// 			break;
			// 		case '/completed':
			// 			vm.status = true;
			// 			break;
			// 		default:
			// 			vm.status = undefined;
			// 			break;
			// 	}
			// })
		}
})(angular)