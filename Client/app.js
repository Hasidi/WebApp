/**
 * Created by Hasidi on 25/01/2017.
 */
var app = angular.module("myApp",['ngRoute', 'LocalStorageModule']);
app.constant('DAYS_TO_COOKIE' , 3);

app.controller("mainController", [ '$rootScope', '$route', '$window', 'cookiesService',
    function($rootScope, $route, $window, cookiesService) {
        var vm = this;
        $rootScope.path = "http://localhost:4000/";
        vm.user = {login: false, name: "", lastVisit: ""};
        $window.location.href = '#/home';


        //-------------------------------------------------------------------------------------------------------
        vm.logout = function () {
            cookiesService.removeAll();
            vm.user = {login: false, name: "", lastVisit: ""};
            localStorageService.remove('cart');
            alert("You have looged out");
        }
        //-------------------------------------------------------------------------------------------------------
        $rootScope.$on("$routeChangeSuccess", function ( e, current, pre) {
            var logedIn = cookiesService.getCookie('user-id');
            if (logedIn && !vm.user.login) {
                var userName = cookiesService.getCookie('user-name');
                vm.user.login = true;
                vm.user.name = userName;
                var fullTime = cookiesService.getCookie('user-lastVisit');
                vm.user.lastVisit = decodeURIComponent(fullTime);
                if (pre && pre.loadedTemplateUrl == "views/home.html")
                    cookiesService.setNewLoginDate();
            }


        })
        //-------------------------------------------------------------------------------------------------------

}]);


app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
    // $locationProvider.html5Mode(true);

}]);

app.config( ['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl : "views/home.html",
            // controller: "mainController"
        })
        .when("/about", {
            templateUrl : "views/about.html",
            // controller: "mainController"
        })
        .when("/store", {
            templateUrl : "views/store.html"
        })
        .when("/register", {
            templateUrl : "views/register.html",
            controller : "registerController"
        })
        .when("/login", {
            templateUrl : "views/login.html",
            controller : "loginController"
        })
        .when("/cart", {
            templateUrl : "views/cart.html"
        })
        .otherwise({redirect: '/',
            controller: "mainController"
        });

}]);



// function GetDate(date) {
//     var day = date.getDate();
//     var month = date.getMonth();
//     var year = date.getYear();
//     return day + "." + month + "." + year;
// }

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('myApp')
        // .setStorageType('sessionStorage')
        .setNotify(true, true)
        .setDefaultToCookie(false);

});