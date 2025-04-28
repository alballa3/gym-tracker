<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class workout extends Model
{
    protected $fillable = [
        'name',
        'description',
        'timer',
        'exercises',
        'user_id',
        'is_template',
    ];
    protected $casts = [
        'exercises' => 'array',
    ];
    public function User(){
        return $this->belongsTo(User::class);
    }
}
