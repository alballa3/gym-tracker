<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('exercises', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('force');
            $table->string('level');
            $table->string('mechanic');
            $table->string('equipment');
            $table->json('primaryMuscles'); // Storing the list of primary muscles
            $table->json('secondaryMuscles'); // Storing the list of secondary muscles
            $table->json('instructions'); // Storing the list of instructions
            $table->string('category');
            $table->json('images'); // Storing the list of image paths
            $table->string('exercise_id'); // Store the id for the exercise (e.g., '3_4_Sit-Up')
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exercises');
    }
};
