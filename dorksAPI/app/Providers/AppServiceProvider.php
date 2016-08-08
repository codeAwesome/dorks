<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Exceptions\UnauthorizedExceptionHandler;
use App\Exceptions\OAuthExceptionHandler;
use League\OAuth2\Server\Exception\OAuthException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerOAuthExceptionHandler();
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    protected function registerOAuthExceptionHandler()
    {
        $handler = $this->app->make('api.exception');
        $handler->register(
            function (OAuthException $exception) {
                return app(OAuthExceptionHandler::class)->handle($exception);
            }
        );
        $handler->register(
            function (UnauthorizedHttpException $exception) {
                return app(UnauthorizedExceptionHandler::class)->handle($exception);
            }
        );
        return $this;
    }
}
