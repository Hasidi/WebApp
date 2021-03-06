/**
 * Created by Hasidi on 06/03/2017.
 */
angular.module("myApp")
    .controller('storeController', function (ProductModel, restService, $rootScope, cartService) {
        var vm = this;
        vm.products = [];
        vm.fieldToOrderBy = "Id";
        vm.reverseSort = false;
        vm.filterBy = "";
        // vm.cart = new cartFactory();

        // cartFactory.initialize();

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
            cartService.addToCart(product);
        }


    });
