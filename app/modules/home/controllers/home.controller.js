/*global angular*/
(function () {

    var controller = function ($scope, $rootScope, $routeParams) {
        //code
        $rootScope.setIndexQuickMenuActive(0);

        $scope.header = {
            title:"Inicio",
            footer:$scope.footer
        };

        $scope.width = 300;
        $scope.viewBy = ['regular','areas','applications'];
        $scope.diagramConfig = {
            viewBy          : $scope.viewBy[0],
            width           : $scope.width,
            figuresHeight   : 200   ,
            marginTop       : 20,
            marginLeft      : 20,
            marginRight     : 20,
            marginBetweenFigures: 50
        };

        $scope.myModel = [
                {
                    id: '1',
                    text: "Capture billing & personal information (name, DOB, SSN)",
                    type: "activity",
                    joinTo: ['2'],
                    joinElse: ''
                },
                {
                    id: '2',
                    text: "Contact information (phone, email and billing adress) Contact information Contact information (phone, email and billing adress) Contact information (phone, email and billing adress) (phone, email and billing adress)",
                    type: "activity",
                    joinTo: ['3'],
                    joinElse: '4'
                },
                {
                    id: '3',
                    text: "Correct Data",
                    type: "if",
                    joinTo: [''],
                    joinElse: ''
                },
                {
                    id: '5',
                    text: "2",
                    type: "end",
                    joinTo: [''],
                    joinElse: ''
                }

            ];
    };
    controller.$inject = ['$scope','$rootScope','$routeParams'];
    angular.module('Home').controller('HomeController', controller);

})();