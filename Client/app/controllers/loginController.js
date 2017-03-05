/**
 * Created by Hasidi on 05/03/2017.
 */

angular.module("myApp")
    .controller('loginController', function(UserModel, restService, $rootScope){
        var vm = this;
        vm.user = new UserModel();
        vm.loginState = false;
        vm.login = function () {
            var reqUrl = $rootScope.path + "getClient" + "?Id=" + vm.user.Id + "&pass=" + vm.user.Password;
            restService.Get(reqUrl,  function (ans) {
                if (ans)
                    vm.loginState = true;
            });
        }

    });