/**
 * Created by Hasidi on 05/03/2017.
 */

angular.module("myApp")
    .controller('loginController', function(UserModel, restService, $rootScope, $location, $window, cookiesService){
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
                    $rootScope.userId = vm.user.userId;  // not good enough - models depends each other
                    var cookieId = cookiesService.getCookie('user-id');
                    if (!cookieId) {
                        cookiesService.addNewCookies(vm.user);
                    }
                    // $location.path('/home');
                    $window.location.href = '#/home';
                }
                else
                {
                    vm.loginState = false;
                    vm.message = "Login Failed- Wrong Id or Password";
                }
            });
        }

    });

