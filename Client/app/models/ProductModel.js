/**
 * Created by Hasidi on 06/03/2017.
 */

angular.module('myApp')
    .factory('ProductModel', [ function () {



        function Product(object) {
            this.Id = object.Id;
            this.ProductName = object.ProductName;
            this.SupplierId = object.SupplierId;
            this.UnitPrice = object.UnitPrice;
            this.Package = object.Package;
            this.IsDiscontinued = object.IsDiscontinued;


        }

        return Product;
    }]);
