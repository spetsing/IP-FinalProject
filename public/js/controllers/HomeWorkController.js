var module = angular.module('myApp');

function HomeWorkController($scope, Services) {
    $scope.services = Services;
    $scope.homework = [{
        date: "10-1",
        description: "test"
    }];
    $scope.classID = Services.getUserInfo().class.id;
    var isTeacher = Services.isTeacher();



    //Check if teacher. If Not, hide ability to add Homework
    $(document).ready(function () {
        if (!this.services.isTeacher()) {
            $("#input").hide();
        }
    }.bind($scope));

    $.ajax({
        type: 'GET',
        url: 'http://34.195.93.38:3001/getHomework?id=' + $scope.classID,
        success: function (data) {
            this.homework = data;
            this.$digest();
        }.bind($scope),
        error: function (err) {
            alert(err.responseJSON);
        }.bind(this)
    });


    $scope.addHomework = function () {
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
                this.homework.push(homework);
                this.$digest();
                $("#hwInputDate").val("");
                $("#hwInputDescription").val("");
            }.bind(this),
            error: function (err) {
                alert(err.responseJSON);
            }.bind(this)
        });
    }
}

HomeWorkController.$inject = [
        '$scope',
        'Services'
    ];

module.controller('HomeWorkController', HomeWorkController);
