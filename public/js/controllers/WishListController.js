var module = angular.module('myApp');

function WishListController($scope, Services) {

    $scope.wishList = [{
        id: "test",
        description: "Pencils",
        parentAssigned:"none"
    },{id:"test1",description:"Paper Towels",parentAssigned:"Dorthy"}];
    $scope.services = Services;
    $scope.classID = Services.getUserInfo().class.id;

    //Check if teacher. If Not, hide ability to add Homework
    $(document).ready(function () {
        if (this.services.isTeacher()) {
            debugger;
        }
    }.bind($scope));

    $.ajax({
        type: 'GET',
        url: 'http://34.195.93.38:3001/getWishList?id=' + $scope.classID,
        success: function (data) {
            this.wishList = data;
            this.$digest();
        }.bind($scope),
        error: function (err) {
            alert(err.responseJSON);
        }.bind(this)
    });


    $scope.addToDo = function () {

        var description = $("#ToDOInputDescription").val();

        var wishListItem = {
            classID: this.classID,
            id: new Date().toISOString(),
            userName: this.services.getUserInfo().userName,
            markedCompleted: [],
            date: new Date().toDateString(),
            description: description,
            parentAssigned: "none"
        }

        $.ajax({
            type: 'POST',
            url: 'http://34.195.93.38:3001/addWishList',
            data: wishListItem,
            success: function (data) {
                this.wishLIst.push(wishListItem);
                this.$digest();
                $("#messageInputDescription").val("");
            }.bind(this),
            error: function (err) {
                alert(err.responseJSON);
            }.bind(this)
        });
    }

    $scope.test = function(x) {
        if(x.parentAssigned === "none"){
            return true;
        } else {
            return false;
        }
    }


}

WishListController.$inject = [
        '$scope',
        'Services'
    ];

module.controller('WishListController', WishListController);
