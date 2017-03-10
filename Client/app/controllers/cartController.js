/**
 * Created by Hasidi on 08/03/2017.
 */
angular.module("myApp")
    .controller('cartController', function (ProductModel, $rootScope, cartService) {
        var vm = this;
        // vm.cart = new cartFactory();
        vm.fieldToOrderBy = "UnitPrice";
        vm.reverseSort = false;
        vm.cart= [];


        vm.removeFromCart = function (product) {
            cartService.removeFromCart(product);
            vm.calculateTotal();
        }

        vm.calculateTotal = function () {
            var cart = cartService.getCart();
            vm.cart = cart[0];
            vm.totalItems = 0;
            vm.totalPrice = 0;
            for (i=0; i< vm.cart.length; i++) {
                vm.totalItems += vm.cart[i].quantity;
                vm.totalPrice += vm.cart[i].quantity * vm.cart[i].theItem.UnitPrice;
            }
        }

        vm.calculateTotal();
    });

