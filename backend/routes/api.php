<?php

use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobController;

Route::get('/', function () {
    return response()->json(['token' => Str::random(50)]);
});

Route::post('/auth/signin', [LoginController::class, 'login']);
Route::post('/auth/signup', [RegisterController::class, 'register']);

Route::get('/public/jobs', [JobController::class, 'all_public']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function () {
        return response()->json(auth()->user());
    });


    // Jobs
    Route::get('/jobs', [JobController::class, 'index']);
    Route::post('/jobs', [JobController::class, 'store']);

});