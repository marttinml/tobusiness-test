/*global angular*/
(function () {

    var controller = function ($scope, $rootScope, $routeParams) {
        //code
        $rootScope.setIndexQuickMenuActive(4);
        
        $scope.getStyle = function(value) {
            var styles = [
                {
                    width: '2350px',
                    height: '1660px'
                },
                {
                    width: '100%',
                    height: '6660px'
                },
                {
                    width: '10200px',
                    height: '700px'
                }
            ];
            return styles[value];
        };

        $scope.header = {
            title:"Ayuda",
            footer: $scope.footer
        };
        $scope.config = {};
        $scope.config.layoutSelect = 0;
        $scope.config.layouts = {
            horizontal : $rootScope.applications,
            vertical : $rootScope.areas
        };
        // $scope.config.changeLayoutSelect(1);

        $scope.procesos = $rootScope.data.arquitectura[0].dominios[0].megaprocesos[0].macroprocesos[0].procesos;
        
        $scope.layout = 0;

        $scope.cambiar = function(value) {
            $scope.layout = value;
        };


        //console.log($rootScope.data.arquitectura[0].dominios[0].megaprocesos[0].macroprocesos[0].procesos);

    };
    controller.$inject = ['$scope', '$rootScope', '$routeParams'];
    angular.module('Help').controller('HelpController', controller);

})();