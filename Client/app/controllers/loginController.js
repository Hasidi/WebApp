/**
 * Created by Hasidi on 05/03/2017.
 */

angular.module("myApp")
    .controller('loginController', function(UserModel, restService, $rootScope, $cookies){
        var vm = this;
        vm.user = new UserModel();
        vm.loginState = false;
        vm.message = "";
        vm.login = function () {
            var reqUrl = $rootScope.path + "getClient" + "?Id=" + vm.user.Id + "&pass=" + vm.user.Password;
            var cookies = $cookies.getAll();
            var expired = new Date();
            $cookies.put('Ecom-app', vm.user.Id);

            restService.Get(reqUrl,  function (ans) {
                if (ans) {
                    vm.loginState = true;
                    vm.message = "Login Succeeded";
                    var today = new Date();
                    expired.setDate(today.getDate() + 1); //Set expired date to tomorrow
                }
                else
                {
                    vm.loginState = false;
                    vm.message = "Login Failed- Wrong Id or Password";
                }
            });
        }

    });

