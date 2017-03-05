/**
 * Created by Hasidi on 04/03/2017.
 */

angular.module('myApp')
    .factory('AuthorModel', [ function () {

        function Author(auhthorID, fName, lName) {

            this.authorID = auhthorID;
            this.firstName = fName;
            this.lastName = lName;
        }

        function Author(object) {
            this.authorID = object.authorID;
            this.firstName = object.firstName;
            this.lastName = object.lastName;
        }

        return Author;
    }]);