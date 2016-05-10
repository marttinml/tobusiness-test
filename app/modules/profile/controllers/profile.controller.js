/*global angular*/
(function () {

    var controller = function ($scope, $rootScope, $routeParams) {
        //code
        
        $rootScope.setIndexQuickMenuActive(3);

        $scope.header = {
            title:"Perfil",
            footer:$scope.footer
        };


    };
    controller.$inject = ['$scope', '$rootScope', '$routeParams'];
    angular.module('Profile').controller('ProfilController', controller);

})();