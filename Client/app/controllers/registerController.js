/**
 * Created by Hasidi on 04/03/2017.
 */
var app = angular.module("myApp");   // don't use again "[]" cause it's override the previous one, we only want to make a call !!!

app.controller('registerController', function(UserModel, restService, $rootScope, $location){
    var vm1 = this;
    vm1.registerVar = 10;

    vm1.user = new UserModel();


    vm1.register = function () {

        users.push(vm1.user);
        var reqUrl = $rootScope.path + "insertClients";
        if (vm1.user.isAdmin == "")
            vm1.user.isAdmin = false;
        else
            vm1.user.isAdmin = true;

        restService.Post(reqUrl, vm1.user, function (ans) {
            if (ans.state) {
                alert("Registration Complete, Go to Login Page");
                $location.path('/login');
            }
            else
            {
                alert(ans.message);
            }
        });

    }
});


var users = [];