var module = angular.module('myApp');

function LoginController($scope, Services, $location) {
    $scope.location = $location;
    $scope.services = Services;
    /*
        Login: Make rest call to server. Verfiy username and password. If valid, route to main page and save user info in model
    */
    $scope.login = function () {
        console.log("LOGGIN");
        //save user info to global model

        //Makse server call to check credentials
        var userName = document.getElementById("fieldUser").value;
        var password = document.getElementById("fieldPassword").value;

        $.ajax({
            type: 'GET',
            url: 'http://34.195.93.38:3001/login?userName=' + userName + '&password=' + password,
            success: function (data) {
                this.services.setUser(data);
                //route to main page
                $("#navBar").show();
                this.location.path("/Main");
                this.$apply();
                //save data to model
            }.bind(this),
            error: function (err) {
                alert(err.responseJSON);
            }.bind(this)
        });


        //this.$apply();
    }
    /*
        Sign Up New User: Hide loginDiv and show signUpDiv
    */
    $scope.signUp = function () {
        console.log("SIGNUP");
        $("#loginDiv").hide();
        $("#signUpDiv").show();
        $("#classNameDiv").hide();
    }

    /*
        Register New User
    */
    $scope.register = function () {
        var user = {
            firstName: document.getElementById("register_firstName").value,
            lastName: document.getElementById("register_lastName").value,
            userName: document.getElementById("register_username").value,
            password: document.getElementById("register_password").value,
            teacher: document.getElementById("teacherCheckBox").checked,
            class: {
                id: document.getElementById("register_classID").value,
                    name: document.getElementById("register_className").value,
                    description: document.getElementById("register_classDescription").value
            }
        }

        if (user.firstName === "") {
            alert("You must enter your First Name");
        } else if (user.lastName) {
            alert("You must enter your Last Name")
        } else if (user.userName) {
            alert("You must enter a User Name");
        } else if (user.password) {
            alert("You must enter a Password");
        } else if (user.teacher && user.class.name === "") {
            alert("You must enter a Class name");
        } else if (user.teacher && user.class.description === "") {
            alert("You must enter a Class Description");
        } else if (user.class.id === "") {
            alert("You must enter a Class ID");
        } else {

            console.log(user);

            //Makse server call to register user
            $.ajax({
                type: 'POST',
                url: 'http://34.195.93.38:3001/registerUser',
                data: user,
                success: function (data) {
                    this.cancel();
                }.bind(this),
                error: function (err) {
                    alert(err.responseText);
                }.bind(this)
            });
        }
    }
    /*
        Cancel Sign Up: Clear Fields, Hide signUpDiv and show loginDiv
    */
    $scope.cancel = function () {
        document.getElementById("register_firstName").value = "";
        document.getElementById("register_lastName").value = "";
        document.getElementById("register_username").value = "";
        document.getElementById("register_password").value = "";
        document.getElementById("register_classID").value = "";
        document.getElementById("teacherCheckBox").checked = false;
        $("#loginDiv").show();
        $("#signUpDiv").hide();
    }

    $scope.selectTeacher = function ($event) {
        var checkBox = document.getElementById("teacherCheckBox");
        if (checkBox.checked === true) {
            $("#classNameDiv").show();
            $("#classDescriptionDiv").show();
        } else {
            $("#classNameDiv").hide();
            $("#classDescriptionDiv").hide();
        }
    }

    /**
        Runs when html is rendered. Hide nav bar and signUpDiv
    */
    $(document).ready(function () {
        $("#navBar").hide();
        $("#signUpDiv").hide();
    });
}


LoginController.$inject = [
        '$scope',
        'Services',
        '$location'
    ];

module.controller('LoginController', LoginController);
