(function (angular) {
	'use strict';
	angular
		.module('todoApp.service', [])
		.service('todoSrv', ['$window', function ($window) {
			var localStorage = $window.localStorage;
			var todoList = JSON.parse(localStorage.getItem('todo'))||[];
			var that = this;

			// 保存数据的方法
			this.save = function(){
				localStorage.setItem('todo',JSON.stringify(todoList))
			}

			// 获取数据的方法
			this.getData = function(){
				return todoList;
			}

			// 添加数据的方法
			this.add = function(taskName){
				var id,
					length = todoList.length;
				if(length<1){
					id=1;
				}else{
					id = todoList[todoList.length-1].id + 1;
				}
				todoList.push({id:id,name:taskName,isCompleted:false})
				that.save();
			}

			// 删除数据的方法
			this.del = function(id){
				todoList.splice(id,1);
				that.save();
			}

			// 全选任务的方法
			this.checkAll = function (isCheckedAll){
				//根据全选按钮选中状态 来控制所有任务项的选中状态
				for(var i=0;i<todoList.length;i++){
					todoList[i].isCompleted = isCheckedAll;
				}
				that.save();
			}

			// 清除已完成任务
			this.delCompleted = function(){
				console.log(todoList);//清空数组
				var tempArr = [];
				for(var i=0;i<todoList.length;i++){
					if(!todoList[i].isCompleted){
						tempArr.push(todoList[i])
					}
				}
				todoList.length = 0;
				[].push.apply(todoList,tempArr)
				that.save();
			}

			// 清除按钮的展示的隐藏
			this.isShow = function () {
				var ret = false;
				for(var i=0;i<todoList.length;i++){
					if(todoList[i].isCompleted){
						ret = true;
						break;
					}
				}
				return ret;
			}

			// 显示未完成数
			this.getCount = function(){
				var count = 0;
				for(var i=0;i<todoList.length;i++){
					if(!todoList[i].isCompleted){
						count++;
					}
				}
				return count;
			}

		}])
})(angular)