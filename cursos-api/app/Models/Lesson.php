<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'module_id',
        'title',
        'tumbnail',
        'position',
        'youtube_video_id'
    ];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }
}
