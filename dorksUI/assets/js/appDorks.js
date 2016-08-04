(function(){
    "use strict";

    angular
        .module('dorksStore', [
            'ui.router',
            'dorksStore.regMerc',
            'dorksStore.login'
        ])
        .config(appConfig);

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function appConfig($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: 'assets/partials/login.tpl.html'
            })
            .state('home', {
                url: "/",
                templateUrl: 'assets/partials/home.tpl.html',
                controller: homeCtrl
            })
            .state('home.regMercancia', {
                url: "regMercancia",
                templateUrl: 'assets/partials/mercancias.tpl.html'
            });

        homeCtrl.$inject = ['$log'];
        function homeCtrl($log){
            $log.log('logeado');
        }
    }
})();
