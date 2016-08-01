(function(){
    var app = angular.module('dorkStore', [
        'ngRoute',
        'regMercMod'
    ]);

    app.config(['$routeProvider', function($routeProvaider){
        $routeProvaider
            .when('/regMercancia', { templateUrl: 'assets/partials/mercancias.tpl.html' })
            .otherwise({ redirectTo: '/' });
    }]);
})();
