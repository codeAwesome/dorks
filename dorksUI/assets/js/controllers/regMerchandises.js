(function(){
    "use strict";

    angular
        .module('dorksStore.regMerc', [
            'ngTouch',
            'ui.bootstrap',
            'ngFileUpload'
        ])
        .controller('registrerCtrl', regMerc)
        .controller('fileCtrl', inputFileController);


    regMerc.$inject = ['inform', 'refrehToken', 'Upload', '$scope'];
    function regMerc(inform, refrehToken, Upload, $scope){
        var vm = this;
        vm.numeric = /^([0-9])*$/;
        vm.merc = {};
        vm.progress = "0";
        $scope.files = [];

        vm.setMerc = setForm;

        vm.clear = clearForm;

        function setForm(merc){
            Upload.base64DataUrl($scope.files).then(function(images){
                console.log(merc, images);

                Upload.upload({
                    url: 'http://api.loc/api/regMerc',
                    data: {
                        files: images,
                        merchandise: JSON.stringify(merc),
                        prueba: 0
                    }
                }).then(success, error, progress);

                function success(res){
                    console.log(res);
                    inform.add("Registro Exitoso! =D", { ttl: 5000, type: 'success' });
                    vm.clear();
                }
                function error(res){
                    console.log(res);
                    if ( refrehToken.refresh(res.status) )
                        refrehToken.setRequestBack(res);
                    else
                        inform.add(res.data.errors.detail, { ttl: 5000, type: 'danger' });
                }
                //progreso durante el envio de la imagen
                function progress(evt){ vm.progress = parseInt(100.0 * evt.loaded / evt.total); }
            });
        }

        function clearForm(){
            vm.merc = {};
            vm.progress = "0";
            vm.mercFrm.$setPristine(true);
        }
    }

    inputFileController.$inject = ['inform', '$scope'];
    function inputFileController(inform, $scope){
        var vm = this;
        vm.active = 0;
        vm.pic1 = vm.pic2 = vm.pic3 = [];
        vm.img = [{
            image: {$ngfBlobUrl:'assets/img/black.jpeg'},
            text: 'Agregue sus imagenes debajo',
            id: 0
        }];


        vm.showDelete = function(n){
            vm['picD'+n] = true;
        }

        vm.hideDelete = function(n){
            vm['picD'+n] = false;
        }

        vm.cargar = function(files, file){
            if ( files.length == 1 ){
                var i = 1;
                var ok = false;
                while( i <= 3 && ok == false ) {
                    if ( !vm['img' + i] ) {
                        vm['img' + i] = file;
                        $scope.$parent.files[i-1 || 0] = file;
                        ok = true;
                    }
                    i++;
                }
            } else if ( files.length > 1 ){
                $scope.$parent.files[0] = vm.img1 = files[0];
                $scope.$parent.files[1] = vm.img2 = files[1];
                $scope.$parent.files[2] = vm.img3 = files[2] || vm.img3;
            }

            if (file) {
                vm.img = [];
                for (i = 0; i < 3; i++) {
                    var j = i+1;
                    var carrusel = vm['img'+j];
                    if (carrusel) {
                        vm.img.push({
                            image: carrusel,
                            id: i
                        });
                    }
                }
            }
        }

        vm.borrar = function (idx){
            if ( vm.img[idx] ){
                var item = vm.img[idx].image;
                var i = 1;
                var ok = false;

                while ( i <= 3 && ok == false ) {
                    var j = 0;
                    var pic = 'pic' + i;
                    while (j < vm[pic].length && ok == false) {
                        if (vm[pic][j] == item) {
                            ok = true;
                            var k = 0;

                            vm['picD'+ (idx + 1)] = false;
                            vm[pic].splice(j, 1);
                            vm['img' + (idx + 1)] = null;
                            vm.img.splice(idx, 1);
                            if( vm.img.length != 0 ) {
                                for (k = 0; k < vm.img.length; k++) {
                                    vm.img[k].id = k;
                                }
                            } else {
                                vm.img = [{
                                    image: {$ngfBlobUrl:'assets/img/black.jpeg'},
                                    text: 'Agregue sus imagenes debajo',
                                    id: 0
                                }];
                            }
                            for (k = 1; k <= 3; k++){
                                var afId = k < 3 ? k + 1 : k;
                                if ( vm['img' + afId] ) {
                                    if ( !vm['img' + k] ) {
                                        vm['img' + k] = vm['img' + afId];
                                        vm['img' + afId] = null;
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
    }
})();
