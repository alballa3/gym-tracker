<?php

namespace Database\Seeders;

use App\Models\exercise;
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
    }
}
