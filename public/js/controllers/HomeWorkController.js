var module = angular.module('myApp');

function HomeWorkController($scope, Services) {
    $scope.services = Services;
    $scope.homework;
    $scope.classID = Services.getUserInfo().class.id

    $.ajax({
                type: 'GET',
                url: 'http://34.195.93.38:3001/getHomework?id='+$scope.classID,
                success: function (data) {
                   this.homework = data;
                    $scope.addHomeworkAssignmentsToView(data);
                }.bind(this),
                error: function (err) {
                    alert(err.responseJSON);
                }.bind(this)
            });
    $scope.addHomeworkAssignmentsToView = function(homework) {
        for(var x = 0; x< homework.length; x++) {
            var panel = document.createElement('div');
            panel.className = 'panel panel-info';
            document.getElementById('homework-section').appendChild(panel);

            var heading = document.createElement('div');
            heading.className = 'panel-heading';
            heading.innerHTML = "Due On: " + homework[x].date;
            panel.appendChild(heading);

            var body = document.createElement('div');
            body.className = 'panel-body';
            body.innerHTML = homework[x].description;
            panel.appendChild(body);
        }
    }

    $scope.addHomework = function() {
        var date = $("#hwInputDate").val();
        var description = $("#hwInputDescription").val();

        var homework = {
            id: this.classID,
            date: date,
            description: description
        }

        $.ajax({
                type: 'POST',
                url: 'http://34.195.93.38:3001/addHomework',
                data: homework,
                success: function (data) {
                   this.addHomeworkToView();
                }.bind(this),
                error: function (err) {
                    alert(err.responseJSON);
                }.bind(this)
            });
    }


    $scope.addHomeworkToView = function () {
        var date = $("#hwInputDate").val();
        var description = $("#hwInputDescription").val();

        if (date == "") {
            alert("Enter Valid Date!");
            return;
        } else if (description == "") {
            alert("Enter Valid Description!");
            return;
        }

        var panel = document.createElement('div');
        panel.className = 'panel panel-info';
        document.getElementById('homework-section').appendChild(panel);

        var heading = document.createElement('div');
        heading.className = 'panel-heading';
        heading.innerHTML = "Due On: " + date;
        panel.appendChild(heading);

        var body = document.createElement('div');
        body.className = 'panel-body';
        body.innerHTML = description;
        panel.appendChild(body);

        $("#hwInputDate").val("");
        $("#hwInputDescription").val("");
    }


}

HomeWorkController.$inject = [
        '$scope',
        'Services'
    ];

module.controller('HomeWorkController', HomeWorkController);
