<?php

namespace App\Http\Controllers;

use App\Models\profile;
use App\Models\User;
use App\Models\workout;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function get(Request $request)
    {
        $user = $request->user()->id;
        $workout = workout::where('user_id', $user)->where('is_template', true)->count();
        $profile = profile::where('user_id', $user)->with('user')->first();
        $profile->workout = $workout;
        return response()->json($profile);
    }
    // Update Bio
    public function updateBio(Request $request)
    {
        $data = $request->validate([
            'bio' => 'required|string|max:500',
        ]);

        $profile = $request->user()->profile();
        $profile->update($data);

        return response()->json($profile);
    }

    // // Update Followers (if applicable)
    // public function updateFollowers(Request $request)
    // {
    //     $data = $request->validate([
    //         'followers' => 'required|integer|min:0',
    //     ]);

    //     $profile = auth()->user()->profile;
    //     $profile->update($data);

    //     return response()->json($profile);
    // }

    // Update Settings (JSON)
    // public function updateSettings(Request $request)
    // {
    //     $data = $request->validate([
    //         'settings' => 'required|array',
    //         'settings.profileVisibility' => 'required|in:public,friends,private',
    //         'settings.settings' => 'required|array',
    //         'settings.settings.showWorkoutHistory' => 'boolean',
    //         'settings.settings.showAchievements' => 'boolean',
    //         // Add other nested validations as needed
    //     ]);

    //     $profile = auth()->user()->profile;
    //     $profile->update(['settings' => $data['settings']]);

    //     return response()->json($profile);
    // }

    // // Update Achievements (JSON Array)
    // public function updateAchievements(Request $request)
    // {
    //     $data = $request->validate([
    //         'achievements' => 'array',
    //         'achievements.*' => 'string', // Adjust based on your structure
    //     ]);

    //     $profile = auth()->user()->profile;
    //     $profile->update(['achievements' => $data['achievements']]);

    //     return response()->json($profile);
    // }

    // Update Goals (JSON Array)
    public function updateGoals(Request $request)
    {
        $profile = $request->user()->profile();
        $data = $request->validate([
            'goals' => 'array',
        ]);
        $profile->update(['goals' => $data['goals']]);

        return response()->json($profile);
    }
    public function updateName(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:50',
        ]);

        $profile = $request->user();
        $profile->update($data);

        return response()->json($profile);
    }
    public function search(Request $request)
    {
        $search = $request->input('search');
        $profile = User::where('name', 'LIKE', "%$search%")
            ->select('name', 'created_at', 'id')
            ->withCount('workouts')
            ->with(['profile:id,user_id,bio,followers'])
            ->limit(5)
            ->latest()
            ->get();
       
        return response()->json($profile);
    }
}
