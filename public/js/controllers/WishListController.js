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


    $scope.addToWishList = function () {

        var description = $("#WishListInputDescription").val();

        var wishListItem = {
            classID: this.classID,
            id: new Date().toISOString(),
            description: description,
            parentAssigned: "none"
        }

        $.ajax({
            type: 'POST',
            url: 'http://34.195.93.38:3001/addWishList',
            data: wishListItem,
            success: function (data) {
                this.wishList.push(wishListItem);
                this.$digest();
                $("#WishListInputDescription").val("");
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

    $scope.signUp = function($event) {

        var signUp = {
            id: event.target.id,
            classID: this.classID,
            userName: this.services.getUserInfo().firstName + " " + this.services.getUserInfo().lastName
        }

         $.ajax({
            type: 'POST',
            url: 'http://34.195.93.38:3001/singUpWishList',
            data: signUp,
            success: function (data) {
               for(var x = 0; x < this.wishList.length; x++) {
                    this.wishList[x].parentAssigned = data[x].parentAssigned;
                }
                this.$digest();
                $("#WishListInputDescription").val("");
            }.bind(this),
            error: function (err) {
                alert(err.responseJSON);
            }.bind(this)
        });

    }


}

WishListController.$inject = [
        '$scope',
        'Services'
    ];

module.controller('WishListController', WishListController);
