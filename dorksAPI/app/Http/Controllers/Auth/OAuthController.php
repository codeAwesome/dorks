<?php

namespace App\Http\Controllers\Auth;

use Authorizer;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;

class OAuthController extends Controller
{
    use Helpers;
    public function authorizeUser(){
        return $this->response->array(Authorizer::issueAccessToken());
    }

    public function authorizePassword($username, $password){
        $credentials = [
            'name'    => $username,
            'password' => $password,
        ];

        if (Auth::once($credentials)) {
            return Auth::user()->id;
        }

        return false;
    }
}
