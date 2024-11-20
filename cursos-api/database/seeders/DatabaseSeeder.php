<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Course;
use App\Models\CourseCategory;
use App\Models\Curse;
use App\Models\Lesson;
use App\Models\Module;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        $user = User::create([
            'name' => 'Test',
            'lastname' => 'User',
            'email' => 'test@example.com',
            'password' => '123'
        ]);

        $category = CourseCategory::create([
            'name' => 'Basico',
            'description' => 'Categoria teste'
        ]);

        $course1 = Course::create([
            'title' => 'Curso 1',
            'description' => 'Curso de teste',
            'category_id' => $category->id,
            'tumbnail' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png',
            'price' => 1.50,
            'youtube_video_id' => '77zgi3kST90'
        ]);

        $module1 = Module::create([
            'course_id' => $course1->id,
            'title' => 'Modulo 1',
            'tumbnail' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png',
            'position' => 1,
            'youtube_video_id' => '77zgi3kST90'
        ]);

       Lesson::create([
            'module_id' => $module1->id,
            'title' => 'Aula 1',
            'tumbnail' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png',
            'position' => 1,
            'youtube_video_id' => 'kH8awKou5Lw'
        ]);

        Lesson::create([
            'module_id' => $module1->id,
            'title' => 'Aula 1',
            'tumbnail' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png',
            'position' => 1,
            'youtube_video_id' => '7l-6PF6tbsQ'
        ]);


        $course2 = Course::create([
            'title' => 'Curso 2',
            'description' => 'Curso de teste',
            'category_id' => $category->id,
            'tumbnail' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png',
            'price' => 1.50,
            'youtube_video_id' => 'qyS4XK_nACo'
        ]);

        $module2 = Module::create([
            'course_id' => $course2->id,
            'title' => 'Modulo 2',
            'tumbnail' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png',
            'position' => 1,
            'youtube_video_id' => 'qyS4XK_nACo'
        ]);

        Lesson::create([
            'module_id' => $module2->id,
            'title' => 'Aula 2',
            'tumbnail' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png',
            'position' => 1,
            'youtube_video_id' => 'qyS4XK_nACo'
        ]);

        Lesson::create([
            'module_id' => $module2->id,
            'title' => 'Aula 2',
            'tumbnail' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png',
            'position' => 1,
            'youtube_video_id' => 'ZxnuGvoXd5Y'
        ]);
    }
}
