/**
 * Created by Hasidi on 07/03/2017.
 */
angular.module('myApp')
    .service('cartFactory', cartFactory);

function cartFactory(localStorageService, $rootScope) {

    var Cart = {};
    if(localStorageService.isSupported) {
        // var storageType = localStorageService.getStorageType();
        var cart = localStorageService.get('cart');
        if (!cart) {
            Cart._cart = [];
            localStorageService.set('cart', Cart);
        }
    }

    Cart.addToCart = function (item) {
        Cart = localStorageService.get('cart');
        Cart._cart.push(item);
        // $rootScope._cart.push(item);
        var y = localStorageService.get('cart');
        localStorageService.set('cart', Cart);

    }
    Cart.removeFromCart = function (item) {
        var found = Cart._cart.indexOf(item);
        if (found != -1) {
            Cart._cart.splice(found, 1);
            $rootScope._cart.splice(found, 1);
        }

    }

    return Cart;
}