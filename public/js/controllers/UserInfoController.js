var module = angular.module('myApp');

function UserInfoController($scope, $http, Services, $location) {

}


    UserInfoController.$inject = [
		'$scope',
        '$http',
        'Services',
        '$location'
	];

    module.controller('UserInfoController', UserInfoController);

