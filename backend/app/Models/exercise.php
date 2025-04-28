<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class exercise extends Model
{
    // Define the fillable properties
    protected $fillable = [
        'name',
        'force',
        'level',
        'mechanic',
        'equipment',
        'primaryMuscles',
        'secondaryMuscles',
        'instructions',
        'category',
        'images',
        'exercise_id',
    ];

    // Optionally, cast the JSON attributes to arrays
    protected $casts = [
        'primaryMuscles' => 'array',
        'secondaryMuscles' => 'array',
        'instructions' => 'array',
        'images' => 'array',
    ];
}
