<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['text', 'due_date', 'completed'];

    protected $casts = [
        'due_date' => 'datetime',
        'completed' => 'boolean',
    ];

    public function isOverdue(): bool
    {
        $dueDate = Carbon::parse($this->due_date);
        $today = Carbon::today();

        return $dueDate->lt($today);
    }
}
