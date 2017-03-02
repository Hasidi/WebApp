/**
 * Created by Hasidi on 25/01/2017.
 */
var app = angular.module("myApp", ["ngRoute"]);

app.controller('mainController', ['$http', function($http) {

    var vm = this;
    vm.num1 = 5;
    vm.num2 = 3;
    vm.sum = vm.num1 + vm.num2;
    vm.serverRes = "";
    vm.add = function(){
        vm.sum = vm.num1 + vm.num2;
        return vm.sum;
        // return num1+num2;
    };

    vm.firstName = "David";
    vm.lastName = "Levi";

    vm.reqFromServer = function(){
        // var reqUrl = "http://localhost:2000?name="+vm.firstName + " " + vm.lastName;
        // var reqUrl = "http://localhost:3000/insertActorGet?id="+vm.firstName;
        var reqUrl = "http://localhost:3000/getCategories";

        $http.get(reqUrl).then(function (response) {
            vm.serverRes = response.data;
            // return vm.data;
        }, function (errResponse) {
            console.error('Error while fetching notes');
        });
    };

    vm.add = function () {
        return vm.num1 + vm.num2;
    }


    vm.toJsonF = function() {
        var obj = {id: vm.id, fName: vm.firstName, lName: vm.lastName};
        var x = angular.toJson(obj);
        console.log(x);
        return obj;

    }

    vm.postData = function () {
        var jsonObj = vm.toJsonF();
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var url = "http://localhost:2000";
        var urlErez = "http://localhost:3000/insertActorPost";
        $http.post(url, jsonObj)
            .then(function (response) {
                vm.serverRes = response.data;
            })
            ,function (jsonObj, status, header, config) {

            };
    };

    vm.sendToSpreadSheet = function () {
        var jsonObj = {"entry.1343975370": vm.firstName, "entry.445960738": vm.lastName};
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var url = "https://docs.google.com/forms/d/e/1FAIpQLSfPoVGhALn3YXEDQ2ZRkmuXMUzw5pGmO3KdhB7nnjmlPq4lAw/formResponse";
        $http.post(url, jsonObj)
            .then(function (response) {
                vm.serverRes = response.data;
            })
            ,function (jsonObj, status, header, config) {

        };

    }

}]);

app.config(function($routeProvider) {
    $routeProvider
        // .when("/", {
        //     templateUrl : "../Views/index.html"
        // })
        .when("/page1", {
            templateUrl : "../Views/page1.html"
        })
        .when("/page2", {
            templateUrl : "../Views/page2.html"
        })
        // .otherwise({
        //     template : "<h1>None</h1><p>Nothing has been selected</p>"
        // });
    .otherwise({redirectTo: '/'});

});


function addNumbers(num1, num2){
    return num1+num2;
}