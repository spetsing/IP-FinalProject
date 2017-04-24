var module = angular.module('myApp');

function UserInfoController($scope, $http, Services, $location) {
    $scope.test = [
        {name: "Steven", age:"12",id:"1"},
        {name: "Pat", age:"13",id:"2"},
        {name: "Rob", age:"14",id:"3"}
    ]

    $scope.userInfo = Services.getUserInfo();

    $scope.testing = function(){
       // this.test.push({name:"Test",age:"15",id:"4"});
        this.test =[{name:"Test",age:"15",id:"4"}]
    }

    $scope.isParent = function(x) {
        if(x.teacher) {
            return true;
        } else {
            return false;
        }
    }
}



    UserInfoController.$inject = [
		'$scope',
        '$http',
        'Services',
        '$location'
	];

    module.controller('UserInfoController', UserInfoController);

