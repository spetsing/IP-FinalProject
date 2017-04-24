var module = angular.module('myApp');

function MainController($scope, $http, Services, $location) {
    $scope.userInfo = Services.getUserInfo();

    document.getElementById('navbar-username').innerHTML = "<i>signed in: </i>" + Services.getUserInfo().userName;
}


MainController.$inject = [
		'$scope',
        '$http',
        'Services',
        '$location'
	];

module.controller('MainController', MainController);
