<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Jobs
        Gate::define('show-job', function ($user, $job) {
            return $user->company_id === $job->company_id;
        });

        Gate::define('update-job', function ($user, $job) {
            return ($user->company_id === $job->company_id && $user->is_admin);
        });

        Gate::define('delete-job', function ($user, $job) {
            return ($user->company_id === $job->company_id && $user->is_admin);
        });
    }
}
