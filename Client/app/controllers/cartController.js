/**
 * Created by Hasidi on 08/03/2017.
 */
angular.module("myApp")
    .controller('cartController', function (ProductModel, $rootScope, cartFactory) {
        var vm = this;
        vm.cart = cartFactory.getCart();
        vm.fieldToOrderBy = "UnitPrice";
        vm.reverseSort = false;



        vm.removeFromCart = function (product) {
            cartFactory.removeFromCart(product);
            vm.calculateTotal();
        }

        vm.calculateTotal = function () {
            vm.totalItems = 0;
            vm.totalPrice = 0;
            for (i=0; i< vm.cart.length; i++) {
                vm.totalItems += vm.cart[i].quantity;
                vm.totalPrice += vm.cart[i].quantity * vm.cart[i].theItem.UnitPrice;
            }
        }

        vm.calculateTotal();
    });

