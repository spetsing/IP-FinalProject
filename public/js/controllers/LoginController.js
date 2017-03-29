var module = angular.module('myApp');

function LoginController($scope, Services) {
    /*
        Login: Make rest call to server. Verfiy username and password. If valid, route to main page and save user info in model
    */
    $scope.login = function () {
        console.log("LOGGIN");
        //save user info to global model

        //route to main page
    }

    /*
        Sign Up New User: Hide loginDiv and show signUpDiv
    */
    $scope.signUp = function () {
        console.log("SIGNUP");
        $("#loginDiv").hide();
        $("#signUpDiv").show();
        $("#classIdDiv").hide();
    }

    /*
        Register New User
    */
    $scope.register = function() {
        var user = {
            firstName: document.getElementById("register_firstName").value,
            lastName: document.getElementById("register_lastName").value,
            userName: document.getElementById("register_username").value,
            password: document.getElementById("register_password").value,
            classID:  document.getElementById("register_classID").value
        }
        console.log(user);
    }

    /*
        Cancel Sign Up: Clear Fields, Hide signUpDiv and show loginDiv
    */
    $scope.cancel = function() {
        document.getElementById("register_firstName").value = ""
        document.getElementById("register_lastName").value = ""
        document.getElementById("register_username").value = ""
        document.getElementById("register_password").value = ""
        document.getElementById("register_classID").value = ""
        $("#loginDiv").show();
        $("#signUpDiv").hide();
    }

    $scope.selectTeacher = function($event) {
        var checkBox = document.getElementById("teacherCheckBox");
        if(checkBox.checked === true) {
            $("#classIdDiv").show();
        } else {
            $("#classIdDiv").hide();
        }
    }

    /*
        Runs when html is rendered. Hide nav bar and signUpDiv
    */
    $(document).ready(function () {
        $("#navBar").hide();
        $("#signUpDiv").hide();
    });



}


LoginController.$inject = [
        '$scope',
        'Services'
    ];

module.controller('LoginController', LoginController);
