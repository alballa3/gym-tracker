<?php

namespace Database\Seeders;

use App\Models\exercise;
use App\Models\profile;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $file_path = public_path('exercises.json');
        $z = file_get_contents($file_path);
        $data = json_decode($z, true);  // true makes it an associative array
        $new_data = array_map(function ($item) {
            return [
                'name' => $item['name'] ?? 'Unknown Exercise',
                'force' => $item['force'] ?? 'none',
                'level' => $item['level'] ?? 'beginner',
                'mechanic' => $item['mechanic'] ?? 'none',
                'equipment' => $item['equipment'] ?? 'body weight',
                'primaryMuscles' => json_encode($item['primaryMuscles'] ?? []),
                'secondaryMuscles' => json_encode($item['secondaryMuscles'] ?? []),
                'instructions' => json_encode($item['instructions'] ?? ['No instructions available']),
                'category' => $item['category'] ?? 'other',
                'images' => json_encode($item['images'] ?? []),
                'exercise_id' => $item['id'] ?? 0,
            ];
        }, $data);
        exercise::insert($new_data);
        $admin = User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => 'admin',
            'user_data' => '{
                "height": "192",
                "height_unit": "cm",
                "weight": "130",
                "weight_unit": "kg",
                "birth_date": "28/8/2002",
                "gender": "Male",
                "fitness_goal": "Muscle Gain",
                "activity_level": "Active (exercise 6-7 days/week)"
                }',
        ]);
        profile::create([
            'user_id' => $admin->id,
        ]);
        $data = User::factory(250)->create();
        $ids = $data->pluck('id')->toArray();
        profile::factory(250)->create([
            'user_id' => $ids,
        ]);
    }
}
