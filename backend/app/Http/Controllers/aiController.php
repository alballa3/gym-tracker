<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class aiController extends Controller
{
  public function index(Request $request)
  {
    $auth = $request->user()->user_data;
    $vaildtion = $request->validate([
      'equipment' => ["required", "string"],
      'muscleGroups' => ["required", "array"],
      'instruction' => ["required", "string"],
    ]);
    $brithDate = $auth["birth_date"];
    $weight = $auth["weight"] . $auth["weight_unit"];
    $height = $auth["height"] . $auth["height_unit"];
    $gender = $auth['gender'];
    $fitnessGoal = $auth['fitness_goal'];
    $activityLevel = $auth['activity_level'];
   
    $muscleGroups = implode(', ', $vaildtion["muscleGroups"]);
    $promt = <<<Text
You are an elite fitness coach and certified personal trainer with extensive experience in creating customized workout programs. Design a safe, effective, and personalized workout routine optimized for the following parameters.

User Profile:
- Height: $height
- Weight: $weight
- Age: $brithDate (Note: Prioritize age-appropriate exercises and proper form)
- Gender: $gender
- Fitness Goal: $fitnessGoal
- Activity Level: $activityLevel

Workout Specifications:
- Available Equipment: {$vaildtion['equipment']}
- Target Muscle Groups: {$muscleGroups}
- Special Instructions:{$vaildtion['instruction']}

Critical Requirements:
1. Design age-appropriate exercises with proper progression
2. Include detailed warm-up sequence and mobility work
3. Emphasize perfect form and injury prevention
4. Optimize work-rest ratios for maximum results
5. Implement progressive overload safely
6. Ensure exercise variety for engagement
7. Include proper cool-down recommendations

Provide a structured workout plan in this exact JSON format:

{
  "name": "string - Create a motivating, descriptive workout name",
  "description": "string - Comprehensive overview with safety guidelines, form cues, and key focus areas(Be short and concise)",
  "exercises": [
    {
      "id": "number - Sequential exercise number",
      "name": "string - Clear, specific exercise name", 
      "difficulty": "number from 1-3 - Either '1=Beginner', '2=Intermediate', or '3=Advanced'",
      "restTime": "number - Rest period in seconds",
      "muscleGroup": "string - Primary muscle group targeted",
      "equipment": "string - Required equipment",
      "sets": how much sets you want to do
    }
  ],
  "duration": "string - Total workout duration in minutes",
  "intensity": "string - Either 'Low', 'Medium', or 'High'",
  "caloriesBurned": "number - Estimated caloric expenditure"
}

Return only valid JSON without additional text or formatting. Ensure all exercises are appropriate for a teenage athlete, focusing on foundational movements and proper progression.`
Text;
    try {
      $resonse = Http::withHeaders([
        'Authorization' => 'Bearer ' . env('AI_API_KEY'),
        'Content-Type' => 'application/json',
        'Accept' => 'application/json',
      ])->timeout(30)->post('https://api.groq.com/openai/v1/chat/completions', [
        'model' => 'meta-llama/llama-4-scout-17b-16e-instruct',
        'messages' => [
          ['role' => 'user', 'content' => $promt],
        ],
        'temperature' => 0.7,
        'max_tokens' => 2000,
      ])->throw()->json();
      $content = $resonse["choices"][0]["message"]["content"];

      // Clean up common formatting issues
      $content = trim($content);
      $content = preg_replace('/^```json|```$/m', '', $content); // Remove ```json and ```
      $content = trim($content);

      // Decode JSON
      $data = json_decode($content, true);

      // Check for errors
      if (json_last_error() !== JSON_ERROR_NONE) {
        return response()->json([
          'error' => 'Invalid JSON from AI',
          'raw_content' => $content,
          'json_error' => json_last_error_msg()
        ], 500);
      }

      return response()->json($data);
    } catch (\Exception $e) {
      return response()->json([
        'error' => 'Failed to generate workout plan',
        'message' => $e->getMessage()
      ], 500);
    }
  }
  public function Chatbot(Request $request){
    $auth = $request->user()->user_data;
    // return response()->json($auth);
    $validtion = $request->validate([
      "text" => ["required", "string"]
    ]);
    $brithDate = $auth["birth_date"] ?? $auth["year"]-$auth["month"]-$auth["day"];
    $weight = $auth["weight"] . $auth["weight_unit"];
    $height = $auth["height"] . $auth["height_unit"];
    $gender = $auth['gender'];
    $fitnessGoal = $auth['fitness_goal'];
    $activityLevel = $auth['activity_level'];
    $promt = <<<Text
    You are an elite fitness coach that is chat bot and certified personal trainer with extensive experience in creating customized workout programs. Design a safe, effective, and personalized workout routine optimized for the following parameters .
    User Profile:
    - Height: $height
    - Weight: $weight
    - Age: $brithDate (Note: Prioritize age-appropriate exercises and proper form)
    - Gender: $gender
    - Fitness Goal: $fitnessGoal
    - Activity Level: $activityLevel
    and here is the question:
    {$validtion['text']}
    Return only valid JSON without additional text or formatting.
    be short that any one can understand and easy to read.
    format the response like this:
    {
      "answer": "string - The answer to the question",
      "related_questions": [
        "string - Related question 1",
        "string - Related question 2",
        "string - Related question 3",
        // ...
      ]
      }
    Text;
    try {
      $resonse = Http::withHeaders([
        'Authorization' => 'Bearer ' . env('AI_API_KEY'),
        'Content-Type' => 'application/json',
        'Accept' => 'application/json',
      ])->timeout(30)->post('https://api.groq.com/openai/v1/chat/completions', [
        'model' => 'meta-llama/llama-4-scout-17b-16e-instruct',
        'messages' => [
          ['role' => 'user', 'content' => $promt],
        ],
        'temperature' => 0.7,
        'max_tokens' => 2000,
      ])->throw()->json();
      $content = $resonse["choices"][0]["message"]["content"];

      // Step 1: Remove ```json or ``` if present
      $content = preg_replace('/^```json|```$/m', '', $content);

      // Step 2: Normalize line endings (optional, depending on source)
      $content = str_replace(["\r\n", "\r"], "\n", $content);

      // Step 3: Remove unescaped control characters (common cause of JSON error)
      $content = preg_replace('/[\x00-\x1F\x7F]/u', '', $content);

      // Decode JSON
      $data = json_decode($content, true);

      // Check for errors
      if (json_last_error() !== JSON_ERROR_NONE) {
        return response()->json([
          'error' => 'Invalid JSON from AI',
          'raw_content' => $content,
          'json_error' => json_last_error_msg()
        ], 500);
      }

      return response()->json($data);
    } catch (\Exception $e) {
      return response()->json([
        'error' => 'Failed to generate workout plan',
        'message' => $e->getMessage()
      ], 500);
    }
  }
  
}
