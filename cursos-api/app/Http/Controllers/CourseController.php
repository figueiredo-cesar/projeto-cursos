<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{

    public function getAll() {
        $courses = Course::with('modules.lessons')->paginate(10);

        return response()->json($courses);
    }
}
