<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\JobCreateRequest;
use App\Models\Address;
use App\Models\Job;

class JobController extends Controller
{
	public function store(JobCreateRequest $request)
	{
		$validated = $request->validated();

		return response()->json([
			'message' => 'Job created successfully',
		], 201);

		// DB::beginTransaction();
		// try {

		// 	$address_from = Address::create($validated['address_from']);
		// 	$address_to = Address::create($validated['address_to']);

		// 	$job = Job::create([
		// 		'address_from_id' => $address_from->id,
		// 		'address_to_id' => $address_to->id,
		// 		'title' => $validated['title'],
		// 		'description' => $validated['description'] ?? null,
		// 		'volume' => $validated['volume'] ?? 0,
		// 		'price' => $validated['price'] ?? 0,
		// 		'user_id' => Auth::user()->id,
		// 		'company_id' => Auth::user()->company_id,
		// 	]);

		// 	DB::commit();
		// 	return response()->json([
		// 		'message' => 'Job created successfully',
		// 	], 201);
		// } catch (\Throwable $th) {
		// 	DB::rollBack();
		// 	return response()->json([
		// 		'message' => 'Job creation failed',
		// 		'error' => $th->getMessage(),
		// 	], 500);

		// }
	}
}
