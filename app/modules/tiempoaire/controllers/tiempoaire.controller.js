/*global angular*/
(function () {
    var controller = function ($scope, $rootScope, $routeParams, $tiempoaire) {
        // var xd = new $tiempoaire.constructor($appService);
        console.log(xd);
        $scope.init = function(){
            $scope.header               = {};
            $scope.header.title         = "Tiempo aire";
            $rootScope.setIndexQuickMenuActive(1);
            $scope.carriers             = $tiempoaire.carriers;
            $scope.data                 = $tiempoaire.data;
        };
        $scope.isValidPhoneNumber = function(){
            return $tiempoaire.isValidPhoneNumber();
        };
        $scope.done = function(){
            alert('Éxito');
            $tiempoaire.do();
        };
        $scope.cancel = function(){
            $tiempoaire.init();
        };
        $scope.init();
    };
    controller.$inject = ['$scope', '$rootScope', '$routeParams','$tiempoaire'];
    angular.module('Tiempoaire').controller('TiempoaireController', controller);
})();