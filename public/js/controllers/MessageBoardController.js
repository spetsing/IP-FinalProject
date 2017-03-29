var module = angular.module('myApp');

function MessageBoardController($scope, Services) {



}

MessageBoardController.$inject = [
        '$scope',
        'Services'
    ];

module.controller('MessageBoardController', MessageBoardController);
