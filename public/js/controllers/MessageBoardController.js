var module = angular.module('myApp');

function MessageBoardController($scope, Services) {
    console.log("message");
    $scope.services = Services;
    $scope.homework;
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
                   this.homework = data;
                    $scope.addMessageBoardToView(data);
                }.bind(this),
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
                   this.addMessageToView(message);
                }.bind(this),
                error: function (err) {
                    alert(err.responseJSON);
                }.bind(this)
            });
    }




    $scope.addMessageBoardToView = function(message) {
        for(var x = 0; x< message.length; x++) {
             var panel = document.createElement('div');
        panel.className = 'panel panel-info';
        document.getElementById('homework-section').appendChild(panel);

        var heading = document.createElement('div');
        heading.className = 'panel-heading';
        heading.innerHTML = message[x].userName;
        panel.appendChild(heading);

        var body = document.createElement('div');
        body.className = 'panel-body';
        body.innerHTML = message[x].description;
        panel.appendChild(body);

        var footer = document.createElement('div');
        footer.className = 'panel-footer';
        footer.innerHTML = message[x].date;
        panel.appendChild(footer);
        }


    }

     $scope.addMessageToView = function (message) {

        var panel = document.createElement('div');
        panel.className = 'panel panel-info';
        document.getElementById('homework-section').appendChild(panel);

        var heading = document.createElement('div');
        heading.className = 'panel-heading';
        heading.innerHTML =  message.userName;
        panel.appendChild(heading);

        var body = document.createElement('div');
        body.className = 'panel-body';
        body.innerHTML = message.date + "\n" +message.description;
        panel.appendChild(body);

        $("#messageInputDescription").val("");
    }



}

MessageBoardController.$inject = [
        '$scope',
        'Services'
    ];

module.controller('MessageBoardController', MessageBoardController);
