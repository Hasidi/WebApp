/**
 * Created by Hasidi on 25/01/2017.
 */
var app = angular.module("myApp",['ngRoute', 'ngCookies']);

app.controller("mainController", [ '$rootScope','$scope', '$cookies', function($rootScope, $scope, $cookies, cookiesHandler) {

    var date = new Date();
    var x = date.getDay();
    var y = date.getDate();

    $rootScope.path = "http://localhost:4000/";
    $scope.testVar = 4;
    $scope.user = {login: false, name: "", lastVisit: ""};
    var userName = $cookies.get('Ecom-name');
    if (userName) {
        $scope.user.login = true;
        $scope.user.name = userName;
        var fullTime = $cookies.get('Ecom-lastVisit');
        $scope.user.lastVisit = fullTime.substring(0, fullTime.indexOf('G'));
        // var today = new Date();
        // var expireDate = new Date();
        // expireDate.setDate(expireDate.getDate() + 1);
        // $cookies.put('Ecom-lastVisit', today, {expires : expireDate});

        var today = cookiesHandler.setNewLoginDate();


    }

    $scope.logout = function () {
        $cookies.remove('Ecom-name');
        $cookies.remove('Ecom-id');
        $cookies.remove('Ecom-lastVisit');
        $scope.user = {login: false, name: "", lastVisit: ""};
        alert("You have looged out");
    }

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
            templateUrl : "views/home.html"
        })
        .when("/about", {
            templateUrl : "views/about.html"
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
        .otherwise({redirectTo: '/'});

}]);


function GetDate(date) {
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getYear();
    return day + "." + month + "." + year;
}