<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobClaim extends Model
{
	public const PENDING = 0;
	public const ACCEPTED = 1;
	public const REJECTED = 2;

	protected $table = 'job_claim';

	protected $fillable = [
		'job_id',
		'claimer_user_id',
		'claim_status',
	];

	public function job()
	{
		return $this->belongsTo(Job::class);
	}

	public function claimer()
	{
		return $this->belongsTo(User::class, 'claimer_user_id');
	}
}
