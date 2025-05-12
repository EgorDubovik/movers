<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
{

	protected $full;

	public function __construct($resource, $full = false)
	{
		parent::__construct($resource);
		$this->full = $full;
	}
	/**
	 * Transform the resource into an array.
	 *
	 * @return array<string, mixed>
	 */
	public function toArray(Request $request): array
	{
		$data = [
			'city' => $this->city,
			'state' => $this->state,
			'zip_code' => $this->zip_code,
		];

		if ($this->full) {
			$data = array_merge($data, [
				'line_1' => $this->line_1,
				'line_2' => $this->line_2,
			]);
		}

		return $data;
	}
}
