<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('todos', [\App\Http\Controllers\TodoController::class, 'index']);
Route::post('todos', [\App\Http\Controllers\TodoController::class, 'store']);
