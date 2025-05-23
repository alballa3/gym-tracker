<?php

namespace App\Http\Controllers;

use App\Models\follow;
use App\Models\User;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    //
    public function follow($id, Request $request)
    {
        $auth = $request->user();
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'message' => 'User not found',
            ], 404);
        }
        // Prevent user from following themselves
        if ($user->id == $auth->id) {
            return response()->json([
                'message' => 'You cannot follow yourself',
            ], 403);
        }
        // Prevent duplicate follow
        $alreadyFollowing = Follow::where('user_id', $user->id)
            ->where('follows_user_id', $auth->id)->exists();

        if ($alreadyFollowing) {
            return response()->json([
                'message' => 'You are already following this user.',
            ], 409); // Conflict
        }
        $follow = new Follow();
        $follow->user_id = $user->id;
        $follow->follows_user_id = $auth->id;
        $follow->save();
        return response()->json([
            'message' => 'You are now following ' . $user->name,
        ], 200);
    }
    public function unfollow($id, Request $request)
    {
        $auth = $request->user();
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'message' => 'User not found',
            ], 404);
        }
        // Prevent user from unfollowing themselves
        if ($user->id == $auth->id) {
            return response()->json([
                'message' => 'You cannot unfollow yourself'
            ], 403);
        }
        $follow = Follow::where('user_id', $user->id)
            ->where('follows_user_id', $auth->id)->first();
        if (!$follow) {
            return response()->json([
                'message' => 'You are not following this user',
            ], 404);
        }
        $follow->delete();
        return response()->json([
            'message' => "You are no longer following {$user->name}"
        ], 200);
    }
    // public function listFollows(Request $request){
    //     $auth = $request->user()->id;
    //     $followers = Follow::where('user_id', $auth)->get();
    //     $following = Follow::where('follows_user_id', $auth)->get();
    //     return response()->json([
    //         'followers' => $followers,
    //         'following' => $following,
    //     ], 200);
    // }

}
