<?php

namespace App\Http\Controllers;

use App\Models\workout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WorkoutController extends Controller
{
    //
    public function storeTemplate(Request $request)
    {
        $vaildtion = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'max:255',
            'timer' => 'required|integer',
            'exercises' => 'required',
        ]);
        $user = $request->user()->id;
        $workout = workout::create([
            'name' => $vaildtion['name'],
            'description' => $vaildtion["description"],
            'timer' => $vaildtion["timer"],
            'exercises' => $vaildtion["exercises"],
            'user_id' => $user,
            'is_template' => true,
        ]);

        return response()->json([
            "message" => "Workout created successfully",
            "workout" => $workout
        ]);
    }
    public function storeWorkout(Request $request)
    {
        $vaildtion = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'max:255',
            'timer' => 'required|integer',
            'exercises' => 'required',
        ]);
        $user = $request->user()->id;
        $workout = workout::create([
            'name' => $vaildtion['name'],
            'description' => $vaildtion["description"],
            'timer' => $vaildtion["timer"],
            'exercises' => $vaildtion["exercises"],
            'user_id' => $user,
            'is_template' => false,
        ]);
        return response()->json([
            "message" => "Workout created successfully",
            "workout" => $workout
        ]);
    }
    public function getWorkout(Request $request,){
        $user = $request->user()->id;
        $workouts = workout::where('user_id', $user)->where('is_template',false)->latest()->get();
        return response()->json($workouts);
    }
    public function getTemplate(Request $request){
        $user = $request->user()->id;
        $template = workout::where('user_id', $user)->where('is_template',true)->limit(5)->get();
        return response()->json($template);
    }
    public function showTemplate($template){
        $template = workout::find($template);
        return response()->json($template);
    }
    public function getExercises(Request $request)
    {
        $exercises = workout::where('is_template', true)->pluck('exercises')->toArray();
        $exercises = array_merge(...$exercises);
        $exercises = array_unique($exercises);
        return response()->json($exercises);
    }
}
