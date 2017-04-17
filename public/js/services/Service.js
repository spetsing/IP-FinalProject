 var module = angular.module('myApp');

   module.factory('Services', function(){

        var data = {
            userInfo:"",
            classInfo:""
        }

        return {
            getUserInfo: function() {
                return data.userInfo;
            },
            getClassInfo: function() {
                return data.classInfo;
            },
            setUser: function(userInfo) {
                data.userInfo = userInfo;
            },
            setClass: function(classInfo) {
                data.classInfo = classInfo;
            }

        }

   })



