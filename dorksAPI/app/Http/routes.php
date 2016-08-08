<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT');
header("Access-Control-Allow-Headers: Authorization, X-Requested-With,  Content-Type, Accept");

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {
    $api->group(['namespace' => 'App\Http\Controllers'], function ($api){
        $api->post('/auth', 'Auth\OAuthController@authorizeUser');
        $api->group(['middleware'=>'api.auth'], function ($api){
            //Uris of the API
            $api->get('/hola', function (){
                return response()->json(['saludo' => 'hablame Ramoon!']);
            });
        });
    });
});
