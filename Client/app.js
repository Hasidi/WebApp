/**
 * Created by Hasidi on 25/01/2017.
 */
var app = angular.module("myApp", [ "ngRoute"]);

app.controller("mainController", function() {
    var vm = this;
    vm.testVar = 4;
});



app.config( ['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });
    $routeProvider
        .when("/about", {
            templateUrl : "./views/about.html"
        })
        .when("/store", {
            templateUrl : "./views/store.html"
        })
        .when("/register", {
            templateUrl : "./views/register.html",
            controller : "registerController"
        })
        // .otherwise({
        //     template : "<h1>None</h1><p>Nothing has been selected</p>"
        // });
        .otherwise({redirectTo: '/'});

}]);


