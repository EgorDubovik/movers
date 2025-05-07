<?php

use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['token' => Str::random(50)]);
});

Route::get('/auth/signin', [LoginController::class, 'login']);
Route::post('/auth/signup', [RegisterController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function () {
        return response()->json(auth()->user());
    });
});