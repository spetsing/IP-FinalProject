var module = angular.module('myApp');

function MessageBoardController($scope, Services) {
    console.log("message")


}

MessageBoardController.$inject = [
        '$scope',
        'Services'
    ];

module.controller('MessageBoardController', MessageBoardController);
