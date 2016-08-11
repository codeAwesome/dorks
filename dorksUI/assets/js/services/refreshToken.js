(function(){
    "use strict"

    angular
        .module('dorksStore')
        .factory('refrehToken', refreshToken);

    refreshToken.$inject = ['$auth', '$state', '$http', 'inform'];
    function refreshToken($auth, $state, $http, inform){
        var obj = {};

        obj.refresh = function(status){
            if( status === 401 ) {

                var user = {
                    "grant_type": "refresh_token",
                    "client_id": "bf7f2b96-1f1d-4268-9f3c-99ad951ca634",
                    "client_secret": "7a0f0ebf-13d7-4af1-b90b-6a76b39b3840",
                    "refresh_token": window.localStorage['refresh_token']
                }

                $auth.login(user)
                    .then(function(){
                        console.log("token actualizado");
                        return true;
                    })
                    .catch(function(){
                        console.log("no se pudo actualizar el token");
                        $state.go('login');
                    });
            }

            return false;
        }
        obj.getToken = function(){
            return window.localStorage['refresh_token'];
        }
        obj.setToken = function(token){
            window.localStorage['refresh_token'] = token;
        }
        obj.clear = function(){
            window.localStorage.removeItem('refresh_token');
        }
        obj.setRequestBack = function(response){
            var url = response.config.url;
            var method = response.config.method;
            var data = response.config.data || {};

            $http[method](url, data).then(
                function(res){
                   //success
                    console.log('ok', res);
                },
                function(res){
                    //error
                    console.log('Error', res);
                }
            );
        }

        return obj;
    }

})();
