<?php

namespace App\Http\Controllers;

use App\Models\profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function register(Request $request)
    {
        $vaildtion = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6'
        ]);
        $user = User::create([
            'name' => $vaildtion['name'],
            'email' => $vaildtion['email'],
            'password' => $vaildtion['password'],
            'user_data' => $request->get('user_data')
        ]);
         profile::create([
            'user_id' => $user->id,
        ]);
        $token = $user->createToken('api-token')->plainTextToken;
        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }
    public function login(Request $request)
    {
        if(Auth::check()){
            return response()->json([
                'message' => 'Already logged in',
            ], 401);
        }
        $vaildtion = $request->validate([
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6'
        ]);
        $user = User::where('email', $vaildtion['email'])->first();
        if (!$user || !Hash::check($vaildtion['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }
        $token = $user->createToken('api-key')->plainTextToken;
        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }
}
