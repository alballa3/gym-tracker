<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class follow extends Model
{
    protected $fillable = [
        'user_id',
        'follows_user_id',
    ];
    public function follower()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function followed()
    {
        return $this->belongsTo(User::class, 'follows_user_id');
    }
}
