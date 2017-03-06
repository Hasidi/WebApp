/**
 * Created by Hasidi on 05/03/2017.
 */

angular.module("myApp")
    .controller('loginController', function(UserModel, restService, $rootScope, $cookies, $location, cookiesHandler){
        var vm = this;
        vm.user = new UserModel();
        vm.loginState = false;
        vm.message = "";
        vm.login = function () {
            var reqUrl = $rootScope.path + "getClient" + "?Id=" + vm.user.Id + "&pass=" + vm.user.Password;
            // var cookies = $cookies.getAll();


            restService.Get(reqUrl,  function (ans) {
                if (ans) {
                    vm.loginState = true;
                    vm.message = "Login Succeeded";
                    vm.user = ans;
                    var cookieId = $cookies.get('Ecom-id');
                    if (!cookieId) {
                        // var expireDate = new Date();
                        // expireDate.setDate(expireDate.getDate() + 1);
                        // $cookies.put('Ecom-id', vm.user.Id, {expires : expireDate});
                        // $cookies.put('Ecom-name', vm.user.FirstName, {expires : expireDate});
                        // var today = new Date();
                        // $cookies.put('Ecom-lastVisit', today, {expires : expireDate});
                        cookiesHandler.addNewCookies(user);
                    }
                    $location.path('/home');
                }
                else
                {
                    vm.loginState = false;
                    vm.message = "Login Failed- Wrong Id or Password";
                }
            });
        }

    });

