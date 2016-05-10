/*global angular*/
(function () {

    var controller = function ($scope, $rootScope, $routeParams) {
        //code
        $rootScope.setIndexQuickMenuActive(4);

        $scope.header = {
            title:"Ayuda",
            footer: $scope.footer
        };
        $scope.config = {};
        $scope.config.layoutSelect = 1;
        $scope.config.layouts = {
            horizontal : $rootScope.applications,
            vertical : $rootScope.areas
        };
        // $scope.config.changeLayoutSelect(1);

        $scope.procesos = $rootScope.data.arquitectura[0].dominios[0].megaprocesos[0].macroprocesos[0].procesos




        console.log($rootScope.data.arquitectura[0].dominios[0].megaprocesos[0].macroprocesos[0].procesos);

    };
    controller.$inject = ['$scope', '$rootScope', '$routeParams'];
    angular.module('Help').controller('HelpController', controller);

})();