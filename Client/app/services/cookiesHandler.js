/**
 * Created by Hasidi on 06/03/2017.
 */
angular.module('myApp')
    .service('cookiesHandler', cookiesHandler);

cookiesHandler.$inject = ['$cookies'];

function cookiesHandler ($cookies) {

    this.addNewCookies = function (user) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        $cookies.put('Ecom-id', user.Id, {expires: expireDate});
        $cookies.put('Ecom-name', user.FirstName, {expires: expireDate});
        var today = new Date();
        $cookies.put('Ecom-lastVisit', today, {expires: expireDate});
        return today;
    };

    this.setNewLoginDate = function () {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        var today = new Date();
        $cookies.put('Ecom-lastVisit', today, {expires: expireDate});
        return today;
    };

    this.remove = function () {
        $cookies.remove('Ecom-name');
        $cookies.remove('Ecom-id');
        $cookies.remove('Ecom-lastVisit');
    };


}

