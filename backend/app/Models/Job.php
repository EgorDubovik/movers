<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{


    public const ACTIVE = 0;
    public const COMPLETED = 1;
    public const ARCHIVED = 2;

    public static $_STATUS = [
        self::ACTIVE => 'Active',
        self::COMPLETED => 'Completed',
        self::ARCHIVED => 'Archived',
    ];


    protected $fillable = [
        'address_from_id',
        'address_to_id',
        'title',
        'description',
        'volume',
        'price',
        'user_id',
        'company_id',
        'delivery_date',
        'status',
    ];

    public function addressFrom()
    {
        return $this->belongsTo(Address::class, 'address_from_id');
    }

    public function addressTo()
    {
        return $this->belongsTo(Address::class, 'address_to_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }
}
