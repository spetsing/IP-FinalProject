var module = angular.module('myApp');

function ToDoListController($scope, Services) {
    $scope.services = Services;
    $scope.classID = Services.getUserInfo().class.id;
    $scope.toDoList = [{id:"test",item:"Pencils"}];

    //Check if teacher. If Not, hide ability to add Homework
    $(document).ready(function () {
        if(this.services.isTeacher()){
            debugger;
           }
    }.bind($scope));

    $.ajax({
                type: 'GET',
                url: 'http://34.195.93.38:3001/getToDoList?id='+$scope.classID,
                success: function (data) {
                    //filter data. If current user has completed item, remove from array
                    for(var x = 0; x < data.length; x++) {
                        var index = data[x].markedCompleted.indexOf(this.services.getUserInfo().userName);
                        if(index >= 0){
                            data.splice(x,1);
                            x--;
                        }
                    }

                    this.toDoList = data;
                    this.$digest();
                }.bind($scope),
                error: function (err) {
                    alert(err.responseJSON);
                }.bind(this)
            });


    $scope.addToDo = function() {

        var description = $("#ToDOInputDescription").val();
        var userName;
        if(this.services.isTeacher()) {
            userName = "Teacher: " + this.services.getUserInfo().firstName + " " + this.services.getUserInfo().lastName
        } else {
            "Parent: " +this.services.getUserInfo().firstName + " " + this.services.getUserInfo().lastName
        }

        var toDo = {
            classID: this.classID,
            id: new Date().toISOString(),
            userName: this.services.getUserInfo().userName,
            markedCompleted:[],
            date: new Date().toDateString(),
            description: description
        }

        $.ajax({
                type: 'POST',
                url: 'http://34.195.93.38:3001/addToDo',
                data: toDo,
                success: function (data) {
                    this.toDoList.push(toDo);
                    this.$digest();
                    $("#messageInputDescription").val("");
                }.bind(this),
                error: function (err) {
                    alert(err.responseJSON);
                }.bind(this)
            });
    }

    $scope.checkItem = function(event) {
        debugger;
        var index = this.findIndexOfObject(this.toDoList,"id",event.target.id);
        console.log(index);

        //Call to server to delete
        var markCompleted = {
            classID: this.classID,
            id: event.target.id,
            userName: this.services.getUserInfo().userName
        }
        this.toDoList.splice(index,1);
        //this.$digest();

        $.ajax({
                type: 'POST',
                url: 'http://34.195.93.38:3001/markCompletedToDo',
                data: markCompleted,
                success: function (data) {
                    //remove that index from array

                }.bind(this),
                error: function (err) {
                    alert(err.responseJSON);
                }.bind(this)
            });
    }

    $scope.findIndexOfObject = function(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}




}

ToDoListController.$inject = [
        '$scope',
        'Services'
    ];

module.controller('ToDoListController', ToDoListController);
