(function(){
    angular
        .module('dorksStore')
        .directive('headerHome', function(){
           return {
               restrict: 'E',
               templateUrl: 'assets/partials/inc/header.tpl.html'
           }
        })
        .directive('asideHome', function(){
            return {
                restrict: 'E',
                templateUrl: 'assets/partials/inc/aside.tpl.html'
            }
        })
        .directive('contentWrapper', function(){
            return {
                restrict: 'E',
                templateUrl: 'assets/partials/inc/contentWrapper.tpl.html'
            }
        })
        .directive('footerHome', function(){
            return {
                restrict: 'E',
                templateUrl: 'assets/partials/inc/footer.tpl.html'
            }
        })
})();
