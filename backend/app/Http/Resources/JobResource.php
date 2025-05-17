<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Job;
class JobResource extends JsonResource
{
    protected $fullAddress = false;

    public function __construct($resource, $fullAddress = false)
    {
        parent::__construct($resource);
        $this->fullAddress = $fullAddress;
    }

    public function withFullAddress()
    {
        $this->fullAddress = true;
        return $this;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'status' => Job::$_STATUS[$this->status],
            'pickupLocation' => AddressResource::make($this->addressFrom, $this->fullAddress),
            'deliveryAddress' => AddressResource::make($this->addressTo, $this->fullAddress),
            'volume' => $this->volume,
            'price' => $this->price,
            'deliveryDate' => $this->delivery_date ?? 'Flexible',
            'company' => [
                'id' => $this->company->id,
                'name' => $this->company->name,
            ],
            'posted' => $this->created_at->diffForHumans(),
        ];
    }
}
