(function(){
    "use strict";

    angular
        .module('dorksStore', [
            'ui.router',
            'dorksStore.regMerc'
        ])
        .config(appConfig);

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function appConfig($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('regMercancia', {
                url: "/regMercancia",
                templateUrl: 'assets/partials/mercancias.tpl.html'
            })
            .state('rais', {
                url: "/",
                templateUrl: 'assets/partials/home.tpl.html'
            });
    }
})();
