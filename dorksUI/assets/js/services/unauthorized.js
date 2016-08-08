(function(){
    "use strict";

    angular
        .module('dorksStore')
        .factory('unauthorized', invalidToken);

    invalidToken.$inject = ['$q'];
    function invalidToken($q){
        return {
            responseError: function(response) {
                if( response.config.headers.Authorization && response.status == -1 ){
                    console.log('token invalido');
                }
                return $q.reject(response);
            }
        }
    }
})();
