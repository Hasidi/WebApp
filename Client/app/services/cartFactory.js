/**
 * Created by Hasidi on 07/03/2017.
 */
angular.module('myApp')
    .service('cartFactory', cartFactory);

function cartFactory(localStorageService, $rootScope) {

    var Cart = [];
    if(localStorageService.isSupported) {
        // var storageType = localStorageService.getStorageType();
        var userId = $rootScope.userId; // get the current login user
        var Cart = localStorageService.get('cart');
        if (!Cart) {
            Cart = [];
            localStorageService.set('cart', Cart);
        }

    }

    Cart.addToCart = function (item) {
        Cart = localStorageService.get('cart');
        Cart.push(item);
        // $rootScope._cart.push(item);
        var y = localStorageService.get('cart');
        localStorageService.set('cart', Cart);

    }
    Cart.removeFromCart = function (item) {
        var foundAt = -1;
        for (i=0; i<Cart.length; i++) {
            if (item.Id == Cart[i].Id) {
                foundAt = i;
                break;
            }
        }
        if (foundAt != -1) {
            Cart.splice(foundAt, 1);
            localStorageService.set('cart', Cart);
        }

    }

    return Cart;
}