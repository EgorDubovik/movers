<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\User;
use ErrorException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class RegisterController extends Controller
{
	public function register(Request $request)
	{
		$request->validate([
			'companyName' => ['required', 'string', 'max:255'],
			'userName' => ['required', 'string', 'max:255'],
			'email' => ['required', 'email', 'max:255', 'unique:users,email'],
			'password' => ['required', 'string', 'min:8', 'confirmed'],
			'secretKey' => ['required', 'string'],
		]);

		// Check sercret key from DB, temperaly from env
		if ($request->secretKey !== config('auth.register_secret_key'))
			return response()->json([
				'message' => 'The given data was invalid.',
				'errors' => [
					'secretKey' => ['Wrong secret key']
				]
			], 422);

		DB::beginTransaction();
		try {
			$company = Company::create([
				'name' => $request->companyName,
			]);
			$user = User::create([
				'name' => $request->userName,
				'password' => $request->password,
				'email' => $request->email,
			]);

			DB::commit();

			$token = "sdfghjkjhgrwetryujghnfbdgs";
			return response()->json(['token' => $token]);

		} catch (ErrorException $errorException) {
			DB::rollBack();
			return response()->json(['error' => 'Somthing went wrong'], 402);
		}


	}
}
