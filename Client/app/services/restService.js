/**
 * Created by Hasidi on 04/03/2017.
 */


angular.module('myApp')
    .service('restService', restService);

restService.$inject = ['$http'];

function restService ($http) {
    this.Get = function (url) {
        return $http.get(url).then(handleSuccess, handleError(error));
    };
    //--------------------------------------------------------------------------------------------------
    this.Create = function(url, data) {
        var jsonObj = angular.toJson(data);
        return $http.post(url, data).then(handleSuccess, handleError('Error creating'));
    };
    //--------------------------------------------------------------------------------------------------
    this.Update = function(url, data) {
        return $http.put(url, data).then(handleSuccess, handleError('Error updating'));
    };
    //--------------------------------------------------------------------------------------------------
    this.Delete = function(url) {
        return $http.delete(url).then(handleSuccess, handleError('Error deleting'));
    };
    //--------------------------------------------------------------------------------------------------
    function handleSuccess(res) {
        return res.data;
    };
    //--------------------------------------------------------------------------------------------------
    function handleError(error) {
        return function () {
            return { success: false, message: error };
        };
    };
    //--------------------------------------------------------------------------------------------------
}