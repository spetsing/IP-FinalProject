var module = angular.module('myApp');

function ToDoListController($scope, Services) {



}

ToDoListController.$inject = [
        '$scope',
        'Services'
    ];

module.controller('ToDoListController', ToDoListController);
