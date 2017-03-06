/**
 * Created by Hasidi on 25/01/2017.
 */
var app = angular.module("myApp",['ngRoute', 'ngCookies']);

app.controller("mainController", [ '$rootScope', '$cookies', '$route', '$window','cookiesHandler',
    function($rootScope, $cookies, $route, $window, cookiesHandler) {
        var vm = this;
        $rootScope.path = "http://localhost:4000/";
        vm.user = {login: false, name: "", lastVisit: ""};
        $window.location.href = '#/home';


        vm.logout = function () {
            cookiesHandler.remove();
            vm.user = {login: false, name: "", lastVisit: ""};
            alert("You have looged out");
        }



        $rootScope.$on("$routeChangeSuccess", function ( e, current, pre) {
            var userName = $cookies.get('Ecom-name');
            if (userName && !vm.user.login) {
                // $location.path('/path1/path2');
                // $window.location.href = '/';
                var userName = $cookies.get('Ecom-name');
                vm.user.login = true;
                vm.user.name = userName;
                var fullTime = $cookies.get('Ecom-lastVisit');
                vm.user.lastVisit = fullTime.substring(0, fullTime.indexOf('G'));
                if (pre && pre.loadedTemplateUrl == "views/home.html")
                    cookiesHandler.setNewLoginDate();
            }

        })



}]);


// https://docs.angularjs.org/guide/migration#commit-aa077e8
app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
    // $locationProvider.html5Mode(true);

}]);

app.config( ['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });
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
        .when("/authors", {
            templateUrl : "views/authors.html",
            controller : "authorsController"
        })
        // .otherwise({
        //     template : "<h1>None</h1><p>Nothing has been selected</p>"
        // });
        .otherwise({redirect: '/',
            controller: "mainController"
        });

}]);


function GetDate(date) {
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getYear();
    return day + "." + month + "." + year;
}