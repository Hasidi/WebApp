/**
 * Created by Hasidi on 06/03/2017.
 */
angular.module('myApp')
    .service('cookiesService', cookiesService);


function cookiesService (localStorageService, DAYS_TO_COOKIE) {

    this.addNewCookies = function (user) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        localStorageService.cookie.add('user-id', user.Id,  DAYS_TO_COOKIE);
        localStorageService.cookie.add('user-name', user.Id,  DAYS_TO_COOKIE);
        var today = new Date();
        var todayStr = today.toDateString();
        localStorageService.cookie.add('user-lastVisit', todayStr,  DAYS_TO_COOKIE);

        return today;
    };

    this.setNewLoginDate = function () {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        var today = new Date();
        localStorageService.cookie.set('user-lastVisit', today.toDateString(), DAYS_TO_COOKIE);
        return today;
    };

    this.remove = function () {
        localStorageService.cookie.remove('user-id');
        localStorageService.cookie.remove('user-name');
        localStorageService.cookie.remove('user-lastVisit');

    };

    this.getCookie = function(cookieName) {
        var ans = localStorageService.cookie.get(cookieName);
        return ans;
    };


}

