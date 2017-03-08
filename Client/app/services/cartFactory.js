/**
 * Created by Hasidi on 07/03/2017.
 */
angular.module('myApp')
    .service('cartFactory', cartFactory);

function cartFactory(localStorageService, $rootScope) {

    var Cart = [];
    if(localStorageService.isSupported) {
        // var storageType = localStorageService.getStorageType();
        var Cart = localStorageService.get('cart');
        if (!Cart) {
            Cart = [];
            localStorageService.set('cart', Cart);
        }

    }

    Cart.addToCart = function (item) {
        Cart = localStorageService.get('cart');
        pushItem(Cart, item);
        // $rootScope._cart.push(item);
        var y = localStorageService.get('cart');
        localStorageService.set('cart', Cart);

    }
    Cart.removeFromCart = function (item) {
        var foundAt = -1;
        for (i=0; i<Cart.length; i++) {
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


    Cart.getCart = function() {
        return Cart;
    }


    return Cart;
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