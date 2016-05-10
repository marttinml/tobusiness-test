/*global angular*/
(function () {

    var controller = function ($scope, $rootScope, $routeParams) {
        //code
        
        $rootScope.setIndexQuickMenuActive(2);
        
        $scope.header = {
            title:"Mensajes",
            footer:$scope.footer
        };

    };
    controller.$inject = ['$scope', '$rootScope', '$routeParams'];
    angular.module('Inbox').controller('InboxController', controller);

})();