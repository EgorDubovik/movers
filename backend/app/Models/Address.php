<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = [
        'line_1',
        'line_2',
        'city',
        'state',
        'zip_code',
        'description',
    ];
}
