<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
	public function setUp(): void
	{

		parent::setUp();
		if (config('app.env') !== 'testing') {
			throw new \Exception('Testing environment is not set');
		}
	}
}
