<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\JobCreateRequest;
use App\Models\Address;
use App\Models\Job;
use App\Http\Resources\JobResource;
use App\Http\Resources\JobResourceCollection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class JobController extends Controller
{

	public function index(Request $request)
	{
		// Gate check
		$jobs = Job::where('company_id', Auth::user()->company_id)
			->orderBy('created_at', 'desc')
			->paginate($request->limit ?? 10);

		return response()->json([
			'jobs' => JobResourceCollection::make($jobs)->withFullAddress(),
			'total' => $jobs->total()
		]);
	}

	public function show($id)
	{
		$job = Job::findOrFail($id);
		Gate::authorize('show-job', $job);
		$job->load('addressFrom', 'addressTo');
		return response()->json([
			'job' => $job,
		]);
	}

	public function update(JobCreateRequest $request, $id)
	{
		$job = Job::findOrFail($id);
		Gate::authorize('update-job', $job);

		DB::beginTransaction();

		try {

			$job->addressFrom->update([
				'line_1' => $request->address_from['line_1'],
				'line_2' => $request->address_from['line_2'],
				'city' => $request->address_from['city'],
				'state' => $request->address_from['state'],
				'zip_code' => $request->address_from['zip_code'],
				'description' => $request->address_from['description'] ?? null,
			]);

			$job->addressTo->update([
				'line_1' => $request->address_to['line_1'],
				'line_2' => $request->address_to['line_2'],
				'city' => $request->address_to['city'],
				'state' => $request->address_to['state'],
				'zip_code' => $request->address_to['zip_code'],
				'description' => $request->address_to['description'] ?? null,
			]);

			$job->update([
				'title' => $request->title,
				'description' => $request->description ?? null,
				'volume' => $request->volume ?? 0,
				'price' => $request->price ?? 0,
			]);

			DB::commit();
			return response()->json([
				'message' => 'Job updated successfully',
			]);
		} catch (\Throwable $th) {
			DB::rollBack();
			Log::error($th->getMessage());
			return response()->json([
				'message' => 'Job update failed',
				'error' => $th->getMessage(),
			], 500);
		}
	}

	public function all_public()
	{
		$jobs = Job::where('status', Job::ACTIVE)
			->orderBy('created_at', 'desc')
			->limit(10)
			->get();

		$response = [
			'jobs' => JobResourceCollection::make($jobs)->withFullAddress(),
		];
		$user = Auth::guard('sanctum')->user();
		if ($user) {
			$response['user'] = [
				'id' => $user->id,
				'name' => $user->name,
				'email' => $user->email,
				'company_id' => $user->company_id,
			];
		}

		return response()->json($response);
	}


	public function store(JobCreateRequest $request)
	{

		$validated = $request->validated();

		DB::beginTransaction();
		try {

			$coords_from = [];
			$coords_to = [];
			$response_from = Http::withHeaders([
				'User-Agent' => 'Movers/1.0 (posik@example.com)',
			])->get('https://nominatim.openstreetmap.org/search', [
						'q' => $request->address_from['line_1'] . ', ' . $request->address_from['city'] . ', ' . $request->address_from['state'] . ', ' . $request->address_from['zip_code'],
						'format' => 'json',
						'limit' => 1,
					]);

			if ($response_from->ok() && count($response_from->json()) > 0) {
				$data = $response_from->json()[0];

				$coords_from = [
					'lat' => $data['lat'],
					'lon' => $data['lon'],
				];
			}


			$address_from = Address::create([
				'line_1' => $request->address_from['line_1'],
				'line_2' => $request->address_from['line_2'],
				'city' => $request->address_from['city'],
				'state' => $request->address_from['state'],
				'zip_code' => $request->address_from['zip_code'],
				'description' => $request->address_from['description'] ?? null,
				'latitude' => $coords_from['lat'] ?? null,
				'longitude' => $coords_from['lon'] ?? null,
			]);

			sleep(1);

			$response_to = Http::withHeaders([
				'User-Agent' => 'Movers/1.0 (posik@example.com)',
			])->get('https://nominatim.openstreetmap.org/search', [
						'q' => $request->address_to['line_1'] . ', ' . $request->address_to['city'] . ', ' . $request->address_to['state'] . ', ' . $request->address_to['zip_code'],
						'format' => 'json',
						'limit' => 1,
					]);

			if ($response_to->ok() && count($response_to->json()) > 0) {
				$data = $response_to->json()[0];
				$coords_to = [
					'lat' => $data['lat'],
					'lon' => $data['lon'],
				];
			}

			$address_to = Address::create([
				'line_1' => $request->address_to['line_1'],
				'line_2' => $request->address_to['line_2'],
				'city' => $request->address_to['city'],
				'state' => $request->address_to['state'],
				'zip_code' => $request->address_to['zip_code'],
				'description' => $request->address_to['description'] ?? null,
				'latitude' => $coords_to['lat'] ?? null,
				'longitude' => $coords_to['lon'] ?? null,
			]);


			$job = Job::create([
				'address_from_id' => $address_from->id,
				'address_to_id' => $address_to->id,
				'title' => $request->title,
				'description' => $request->description ?? null,
				'volume' => $request->volume ?? 0,
				'price' => $request->price ?? 0,
				'user_id' => Auth::user()->id,
				'company_id' => Auth::user()->company_id,
			]);

			DB::commit();
			return response()->json([
				'message' => 'Job created successfully',
			], 201);
		} catch (\Throwable $th) {
			DB::rollBack();
			Log::error($th->getMessage());
			return response()->json([
				'message' => 'Job creation failed',
				'error' => $th->getMessage(),
			], 500);

		}
	}

	public function destroy($id)
	{
		$job = Job::findOrFail($id);

		Gate::authorize('delete-job', $job);

		Address::destroy($job->address_from_id);
		Address::destroy($job->address_to_id);

		Job::destroy($id);
		return response()->json([
			'message' => 'Job deleted successfully',
		]);
	}
}
