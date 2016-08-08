(function(){
    "use strict";

    angular
        .module('dorksStore', [
            'inform',
            'ngAnimate',
            'ui.router',
            'dorksStore.regMerc',
            'dorksStore.login'
        ])
        .config(appConfig);

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];
    function appConfig($stateProvider, $urlRouterProvider, $httpProvider){
        $urlRouterProvider.otherwise("/");
        $httpProvider.interceptors.push('unauthorized');

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

        homeCtrl.$inject = ['$auth', '$state'];
        function homeCtrl($auth, $state){
            if( !$auth.isAuthenticated() )
                $state.go('login');
        }
    }
})();
