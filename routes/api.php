<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('tasks', [\App\Http\Controllers\TaskController::class, 'index'])->name('tasks.index');
Route::post('tasks', [\App\Http\Controllers\TaskController::class, 'store']);
Route::put('tasks/complete/{task}', [\App\Http\Controllers\TaskController::class, 'complete']);
Route::put('tasks/{task}', [\App\Http\Controllers\TaskController::class, 'update']);
Route::delete('tasks/{task}', [\App\Http\Controllers\TaskController::class, 'destroy']);
