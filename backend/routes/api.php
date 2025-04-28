<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\WorkoutController;
use App\Models\exercise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login')->middleware('guest');
});
Route::controller(WorkoutController::class)->group(function () {
    // Route::get('/workouts', 'index');
    // Route::get('/workouts/{workout}', 'show');
    Route::post('/workouts', 'storeWorkout')->middleware('auth:sanctum');
    Route::post('/template', 'storeTemplate')->middleware('auth:sanctum');
});
