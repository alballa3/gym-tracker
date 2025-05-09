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
        Schema::create('profile', function (Blueprint $table) {
            $table->id();
            $table->string('bio')->default('am an cool guy who like to workout :)');
            $table->integer('followers')->default(0);
            $table->integer('following')->default(0);
            $table->json('settings')->default('{
            "profileVisibility": "friends",
            "settings": {
                "showWorkoutHistory": true,
                "showAchievements": true,
                "showStats": true,
                "allowDataCollection": false,
                "showRealName": false,
                "allowTagging": true
            }
        }');
            $table->json('achievements')->default('[]');
            $table->json('goals')->default('[]');
            $table->foreignId('user_id')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
