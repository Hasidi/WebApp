/**
 * Created by Hasidi on 04/03/2017.
 */

angular.module('myApp')
    .factory('UserModel', [ function () {

        function User(userName, fName, lName, password) {

            this.userName = userName;
            this.firstName = fName;
            this.lastName = lName;
            this.password = password;
        }

        return User;
    }]);
