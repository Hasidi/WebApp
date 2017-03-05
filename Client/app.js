/**
 * Created by Hasidi on 25/01/2017.
 */
var app = angular.module("myApp",['ngRoute', 'ngCookies']);

app.controller("mainController", [ '$rootScope','$scope', '$cookies', function($rootScope, $scope, $cookies) {
    $rootScope.path = "http://localhost:4000/";
    $scope.testVar = 4;
    // $scope.user = new UserModel();
    $scope.logedIn = false;
    var cookieId = $cookies.get('Ecom-app');
    if (cookieId)
        $scope.logedIn = true;

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
        .when("/about", {
            templateUrl : "/views/about.html"
        })
        .when("/store", {
            templateUrl : "/views/store.html"
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
        .otherwise({redirectTo: '/'});

}]);


