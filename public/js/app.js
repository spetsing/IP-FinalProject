angular.module('myApp', ['ngRoute', 'ngResource'])

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider

    // home page
        .when('/', {
            templateUrl: 'views/Login.html',
            controller: 'LoginController'
        })

        .when('/Main', {
            templateUrl: 'views/Main.html',
            controller: 'MainController'
        })

        .when('/UserInfo', {
                templateUrl: 'views/UserInfo.html',
                controller: 'UserInfoController'
        })
        .when('/HomeWork', {
            templateUrl: 'views/HomeWork.html',
            controller: 'HomeWorkController'
        })
        .when('/ToDoList', {
            templateUrl: 'views/ToDoList.html',
            controller: 'ToDoListController'
        })
        .when('/WishList', {
            templateUrl: 'views/WishList.html',
            controller: 'WishListController'
        })
        .when('/MessageBoard', {
            templateUrl: 'views/MessageBoard.html',
            controller: 'MessageBoardController'
        });



    $locationProvider.html5Mode(true);

}]);
