var module = angular.module('myApp');

function MainController($scope, $http, Services, $location) {

}


    MainController.$inject = [
		'$scope',
        '$http',
        'Services',
        '$location'
	];

    module.controller('MainController', MainController);

