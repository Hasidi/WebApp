/**
 * Created by Hasidi on 04/03/2017.
 */
angular.module("myApp")
    .controller('authorsController', function (AuthorModel, restService, $rootScope) {
        var vm = this;
        vm.authors = [];
        vm.fieldToOrderBy = "authorID";
        vm.rverseSort = false;


        vm.getAllAuthors = function () {
            var reqUrl = $rootScope.path + "getAuthors";
            var ans = restService.Get(reqUrl, function (response) {
                var x = 8;
                vm.authors = [];
                angular.forEach(response, function (author) {
                    vm.authors.push(new AuthorModel(author));
                    // vm.authors.push(author);
                })
            });
        }
        //-------------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------------

        //-------------------------------------------------------------------------------------------------------



    });

