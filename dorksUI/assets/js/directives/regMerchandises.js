(function(){
    angular
        .module('dorksStore.regMerc')
        .directive('inputsMerc', function(){
            return {
                restrict: 'E',
                templateUrl: 'assets/partials/inc/regMercInputs.tpl.html'
            }
        })
        .directive('imagesMerc', function(){
            return {
                restrict: 'E',
                templateUrl: 'assets/partials/inc/regMercImages.tpl.html'
            }
        })
})();
