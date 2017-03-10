/**
 * Created by Hasidi on 08/03/2017.
 */
angular.module("myApp")
    .controller('cartController', function (ProductModel, $rootScope, cartFactory) {
        var vm = this;
        vm.cart = new cartFactory();
        vm.fieldToOrderBy = "UnitPrice";
        vm.reverseSort = false;



        vm.removeFromCart = function (product) {
            vm.cart.removeFromCart(product);
            vm.calculateTotal();
        }

        vm.calculateTotal = function () {
            vm.totalItems = 0;
            vm.totalPrice = 0;
            for (i=0; i< vm.cart.theCart.length; i++) {
                vm.totalItems += vm.cart.theCart[i].quantity;
                vm.totalPrice += vm.cart.theCart[i].quantity * vm.cart.theCart[i].theItem.UnitPrice;
            }
        }

        vm.calculateTotal();
    });

