/*global angular*/
(function () {

    var router = function ($routeProvider) {

        
        var baseUrl = 'app/modules/';


        // Home
        $routeProvider.when('/home', {
            templateUrl: baseUrl + 'home/views/home.view.html',
            controller: 'HomeController'
        });

        // Help
        $routeProvider.when('/help', {
            templateUrl: baseUrl + 'help/views/help.view.html',
            controller: 'HelpController'
        });

        // Profil
        $routeProvider.when('/profile', {
            templateUrl: baseUrl + 'profile/views/profile.view.html',
            controller: 'ProfilController'
        });

        // Inbox
        $routeProvider.when('/inbox', {
            templateUrl: baseUrl + 'inbox/views/inbox.view.html',
            controller: 'InboxController'
        });

        // Tiempoaire
        $routeProvider.when('/tiempoaire', {
            templateUrl: baseUrl + 'tiempoaire/views/tiempoaire.view.html',
            controller: 'TiempoaireController'
        });

    };

    router.$inject = ['$routeProvider'];
    angular.module('app').config(router);

})();