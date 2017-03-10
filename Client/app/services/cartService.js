/**
 * Created by Hasidi on 07/03/2017.
 */
angular.module('myApp')
    .service('cartService', cartService);

function cartService(localStorageService, $rootScope) {

    var Cart = [];
    if(localStorageService.isSupported) {
        // var storageType = localStorageService.getStorageType();
        Cart = localStorageService.get('cart');
        if (!Cart) {
            Cart = [];
            localStorageService.set('cart', Cart);
        }

    }



    cartService.addToCart = function (item) {
        Cart = localStorageService.get('cart');
        if (!Cart) {
            Cart = [];
            localStorageService.set('cart', Cart);
        }
        pushItem(Cart, item);
        localStorageService.set('cart', Cart);

    }
    cartService.removeFromCart = function (item) {
        var foundAt = -1;
        for (i=0; i< Cart.length; i++) {
            if (item.itemID == Cart[i].itemID) {
                foundAt = i;
                break;
            }
        }
        if (foundAt != -1) {
            if (Cart[foundAt].quantity > 1) {
                Cart[foundAt].quantity --;
            }
            else {
                Cart.splice(foundAt, 1);
            }
            localStorageService.set('cart', Cart);
        }

    }


    cartService.getCart = function() {
        var cart = localStorageService.get('cart');
        if (!cart) {
            cart = [];
        }
        return new Array(cart);
    }


    cartService.deleteCart = function () {
        Cart = [];
        localStorageService.remove('cart');

    }

    // Cart.prototype.calcTotalCost = function () {
    //     vm.totalItems = 0;
    //     vm.totalPrice = 0;
    //     for (i=0; i< vm.cart.length; i++) {
    //         vm.totalItems += vm.cart[i].quantity;
    //         vm.totalPrice += vm.cart[i].quantity * vm.cart[i].theItem.UnitPrice;
    //     }
    // }


    return cartService;
}

function pushItem(list, item) {
    var foundAt = -1;
    for (i=0; i<list.length; i++) {
        if (item.Id == list[i].itemID) {
            foundAt = i;
            break;
        }
    }
    if (foundAt == -1) {
        list.push({itemID: item.Id, theItem: item, quantity: 1});
    }
    else {
        list[foundAt].quantity ++;
    }
}
