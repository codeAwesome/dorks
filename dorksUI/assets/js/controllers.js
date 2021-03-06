(function(){
    var app = angular.module('regMercMod', [
        'ngTouch',
        'ui.bootstrap',
        'inform',
        'ngAnimate',
        'ngFileUpload'
    ]);

    app.controller('regMercCtrl',['$scope', 'inform', function($scope, inform){
        $scope.numeric = /^([0-9])*$/;
        $scope.merc = {};
        $scope.setMerc = function(merc){
            if ( $scope.mercFrm.$valid ){
                console.log(merc);
                $scope.clear();
                inform.add("Registro Exitoso! =D", { ttl: 3000, type: 'success' });
            } else {
                inform.add("El Formulario es Invalido", { ttl: 3000, type: 'warning' });
            };
        };
        $scope.clear = function(){
            $scope.merc = {};
            $scope.mercFrm.$setPristine(true);
        };
    }]);

    app.controller('imagesCtrl',['$scope', function($scope){
        $scope.img = [{
            image: {$ngfBlobUrl:'assets/img/black.jpeg'},
            text: 'Agregue sus imagenes debajo',
            id: 0
        }];
        $scope.active = 0;
    }]);

    app.controller('fileCtrl',['$scope', 'inform', function($scope, inform){
        $scope.pic1 = [];
        $scope.pic2 = [];
        $scope.pic3 = [];

        $scope.showDelete = function(n){
            $scope['picD'+n] = true;
        }
        $scope.hideDelete = function(n){
            $scope['picD'+n] = false;
        }

        $scope.cargar = function(files, file){
            if ( files.length == 1 ){
                var i = 1;
                var ok = false;
                while( i <= 3 && ok == false ) {
                    if ( !$scope['img' + i] ) {
                        $scope['img' + i] = file;
                        ok = true;
                    }
                    i++;
                }
            } else if ( files.length > 1 ){
                $scope.img1 = files[0];
                $scope.img2 = files[1];
                $scope.img3 = files[2] || $scope.img3;
            }
            if (file) {
                $scope.$parent.img = [];
                for (i = 0; i < 3; i++) {
                    j = i+1;
                    carrusel = $scope['img'+j];
                    if (carrusel) {
                        $scope.$parent.img.push({
                            image: carrusel,
                            id: i
                        });
                    }
                }
            }
        }

        $scope.borrar = function(idx){
            if ( $scope.$parent.img[idx] ){
                var item = $scope.$parent.img[idx].image;
                var i = 1;
                var ok = false;

                while ( i <= 3 && ok == false ) {
                    var j = 0;
                    var pic = 'pic' + i;
                    while (j < $scope[pic].length && ok == false) {
                        if ($scope[pic][j] == item) {
                            ok = true;
                            $scope['picD'+ (idx + 1)] = false;
                            $scope[pic].splice(j, 1);
                            $scope['img' + (idx + 1)] = null;
                            $scope.$parent.img.splice(idx, 1);
                            if( $scope.$parent.img.length != 0 ) {
                                for (k = 0; k < $scope.$parent.img.length; k++) {
                                    $scope.$parent.img[k].id = k;
                                }
                            } else {
                                $scope.$parent.img = [{
                                    image: {$ngfBlobUrl:'assets/img/black.jpeg'},
                                    text: 'Agregue sus imagenes debajo',
                                    id: 0
                                }];
                            }
                            for (k = 1; k <= 3; k++){
                                var afId = k < 3 ? k + 1 : k;
                                if ( $scope['img' + afId] ) {
                                    if ( !$scope['img' + k] ) {
                                        $scope['img' + k] = $scope['img' + afId];
                                        $scope['img' + afId] = null;
                                    }
                                }
                            }
                        }
                        j++;
                    }
                    i++;
                }

                if ( ok == false )
                    inform.add("No se Encontro la Imagen", {ttl: 3000, type: 'warning'});

            } else {
                inform.add("La Imagen ya fue eliminada", {ttl: 3000, type: 'warning'});
            }
        }
    }]);
})();
