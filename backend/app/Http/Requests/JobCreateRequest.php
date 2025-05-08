<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
class JobCreateRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		$user = Auth::user();
		return $user->isAdmin();
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{
		return [
			'address_from.line_1' => 'required|string|max:255',
			'address_from.line_2' => 'nullable|string|max:255',
			'address_from.city' => 'required|string|max:255',
			'address_from.state' => 'required|string|max:255',
			'address_from.zip_code' => 'required|string|max:20',

			'address_to.line_1' => 'required|string|max:255',
			'address_to.line_2' => 'nullable|string|max:255',
			'address_to.city' => 'required|string|max:255',
			'address_to.state' => 'required|string|max:255',
			'address_to.zip_code' => 'required|string|max:20',

			'title' => 'required|string|max:255',
			'volume' => 'required|numeric|min:0',
			'price' => 'required|numeric|min:0',
		];
	}

	public function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
	{
		$response = response()->json([
			'message' => 'Validation failed! Please check the fields.',
			'errors' => $validator->errors(),
		], 422);

		throw new \Illuminate\Validation\ValidationException($validator, $response);
	}

}
