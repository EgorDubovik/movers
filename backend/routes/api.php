<?php

use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\JobController;

Route::get('/', function () {
	return response()->json(['token' => Str::random(50)]);
});

Route::post('/auth/signin', [LoginController::class, 'login']);
Route::post('/auth/signup', [RegisterController::class, 'register']);

Route::get('/public/jobs', [JobController::class, 'all_public']);

Route::middleware('auth:sanctum')->group(function () {
	Route::get('/user', function () {
		return response()->json(
			[
				'user' => auth()->user()
			]
		);
	});


	// Jobs
	Route::get('/jobs', [JobController::class, 'index']);
	Route::get('/job/my-claimed-job', [JobController::class, 'my_claimed_job']);
	Route::get('/job/{id}', [JobController::class, 'show']);
	Route::post('/jobs', [JobController::class, 'store']);
	Route::put('/job/{id}', [JobController::class, 'update']);
	Route::delete('/jobs/{id}', [JobController::class, 'destroy']);

	Route::post('/jobs/{id}/claim', [JobController::class, 'claim']);

});