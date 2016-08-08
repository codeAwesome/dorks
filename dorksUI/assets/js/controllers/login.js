(function(){
    "use strict";

    angular
        .module('dorksStore.login', [
            'inform',
            'satellizer',
        ])
        .config(loginConfig)
        .controller('loginCtrl', login)

    loginConfig.$inject = ['$authProvider'];
    function loginConfig($authProvider){
        $authProvider.loginUrl = 'http://api.loc/api/auth';
        $authProvider.tokenName = "access_token";
        $authProvider.tokenPrefix = 'user';
    }

    login.$inject = ['$auth', '$state', 'refrehToken'];
    function login($auth, $state, refrehToken){
        var vm = this;

        vm.send = sendForm;

        function sendForm(){
            var user = {
                "grant_type": "password",
                "client_id": "bf7f2b96-1f1d-4268-9f3c-99ad951ca634",
                "client_secret": "7a0f0ebf-13d7-4af1-b90b-6a76b39b3840",
                "username": vm.nickName,
                "password": vm.password,
            }

            $auth.login(user)
                .then(function(res){
                    $state.go('home');
                    refrehToken.setToken( res.data['refresh_token'] );
                })
                .catch(function(res){
                    console.log(res);
                });
        }
    }
})();
