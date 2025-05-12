<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class JobResourceCollection extends ResourceCollection
{

    protected $fullAddress = false;

    public function withFullAddress(): static
    {
        $this->fullAddress = true;
        return $this;
    }


    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($job) {
            return JobResource::make($job, $this->fullAddress);
        })->toArray();
    }
}
