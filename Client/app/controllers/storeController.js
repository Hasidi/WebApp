/**
 * Created by Hasidi on 06/03/2017.
 */
angular.module("myApp")
    .controller('storeController', function (ProductModel, restService, $rootScope, cartFactory) {
        var vm = this;
        vm.products = [];
        vm.fieldToOrderBy = "Id";
        vm.reverseSort = false;
        vm.filterBy = "";

        cartFactory.initialize();

        vm.getAllProducts = function () {
            var reqUrl = $rootScope.path + "getProducts";
            var ans = restService.Get(reqUrl, function (response) {
                vm.products = [];
                angular.forEach(response, function (product) {
                    vm.products.push(new ProductModel(product));
                })
            });
        }

        vm.addCart = function (product) {
            cartFactory.addToCart(product);
        }


    });
