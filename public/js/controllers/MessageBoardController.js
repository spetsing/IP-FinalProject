var module = angular.module('myApp');

function MessageBoardController($scope, Services) {
    console.log("message");
    $scope.services = Services;
    $scope.messageBoard = [];
    $scope.classID = Services.getUserInfo().class.id;
    var isTeacher = Services.isTeacher();

    //Check if teacher. If Not, hide ability to add Homework
    $(document).ready(function () {
        if(this.services.isTeacher()){
            debugger;
           }
    }.bind($scope));

    $.ajax({
                type: 'GET',
                url: 'http://34.195.93.38:3001/getMessageBoard?id='+$scope.classID,
                success: function (data) {
                    this.messageBoard = data;
                    this.$digest();
                }.bind($scope),
                error: function (err) {
                    alert(err.responseJSON);
                }.bind(this)
            });

    $scope.addMessage = function() {

        var description = $("#messageInputDescription").val();
        var userName;
        if(this.services.isTeacher()) {
            userName = "Teacher: " + this.services.getUserInfo().firstName + " " + this.services.getUserInfo().lastName
        } else {
            "Parent: " +this.services.getUserInfo().firstName + " " + this.services.getUserInfo().lastName
        }
        var message = {
            id: this.classID,
            userName: userName,
            date: new Date().toDateString(),
            description: description
        }

        $.ajax({
                type: 'POST',
                url: 'http://34.195.93.38:3001/addMessage',
                data: message,
                success: function (data) {
                    this.messageBoard.push(message);
                    this.$digest();
                    $("#messageInputDescription").val("");
                }.bind(this),
                error: function (err) {
                    alert(err.responseJSON);
                }.bind(this)
            });
    }




}

MessageBoardController.$inject = [
        '$scope',
        'Services'
    ];

module.controller('MessageBoardController', MessageBoardController);
