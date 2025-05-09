<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class profile extends Model
    
{
    protected $table= "profile";
    protected $casts = [
        'settings' => 'array',
        'achievements' => 'array',
        'goals' => 'array',
    ];
    protected $fillable = [
        'settings',
        'achievements',
        'goals',
        'user_id',
        'bio',
        'followers',
        'following'
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
}
