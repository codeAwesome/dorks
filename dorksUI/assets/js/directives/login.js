(function(){
    angular
        .module('dorksStore.login')
        .directive('loginForm', function(){
            return {
                restrict: 'E',
                templateUrl: 'assets/partials/inc/loginForm.tpl.html'
            }
        })
})();
