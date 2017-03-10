/**
 * Created by Hasidi on 07/03/2017.
 */
angular.module('myApp')
    .service('cartFactory', cartFactory);

function cartFactory(localStorageService, $rootScope) {

    var Cart = function() {
        if(localStorageService.isSupported) {
            // var storageType = localStorageService.getStorageType();
            this.theCart = localStorageService.get('cart');
            if (!this.theCart) {
                this.theCart = [];
                localStorageService.set('cart', this.theCart);
            }

        }
    }


    Cart.prototype.addToCart = function (item) {
        this.theCart = localStorageService.get('cart');
        pushItem(this.theCart, item);
        // $rootScope._cart.push(item);
        var y = localStorageService.get('cart');
        localStorageService.set('cart', this.theCart);

    }
    Cart.prototype.removeFromCart = function (item) {
        var foundAt = -1;
        for (i=0; i<this.theCart.length; i++) {
            if (item.itemID == this.theCart[i].itemID) {
                foundAt = i;
                break;
            }
        }
        if (foundAt != -1) {
            if (this.theCart[foundAt].quantity > 1) {
                this.theCart[foundAt].quantity --;
            }
            else {
                this.theCart.splice(foundAt, 1);
            }
            localStorageService.set('cart', this.theCart);
        }

    }


    Cart.prototype.getCart = function() {
        return this.theCart;
    }

    // Cart.initialize = function () {
    //     if(localStorageService.isSupported) {
    //         // var storageType = localStorageService.getStorageType();
    //         Cart.theCart = localStorageService.get('cart');
    //         if (!Cart.theCart) {
    //             Cart.theCart = [];
    //             localStorageService.set('cart', Cart.theCart);
    //         }
    //
    //     }
    // }

    Cart.prototype.deleteCart = function () {
        this.theCart = [];
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