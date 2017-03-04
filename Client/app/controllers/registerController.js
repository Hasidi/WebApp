/**
 * Created by Hasidi on 04/03/2017.
 */
var app = angular.module("myApp");   // don't use again "[]" cause it's override the previous one, we only want to make a call !!!

app.controller('registerController', function(UserModel, restService){
    var vm1 = this;
    vm1.registerVar = 10;

    vm1.user = {};


    vm1.register = function () {
        vm1.user = new UserModel(vm1.user.username, vm1.user.firstName, vm1.user.lastName, vm1.user.password);
        users.push(vm1.user);

        var reqUrl = "http://localhost:4000/insertAuthors";
        var ans = restService.Create(reqUrl, vm1.user);

    }
});


var users = [];