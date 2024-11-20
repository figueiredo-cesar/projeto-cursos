<?php

namespace App\Http\Controllers;

use App\Mail\SendCodeResetPassword;
use App\Models\PasswordResetToken;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ForgotPasswordController extends Controller
{
    //
    public function __invoke(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email|exists:users',
        ]);

        
        $user = User::firstWhere('email', $request->email);
        
        $data['token'] = mt_rand(100000, 999999);
        $data['user_id'] = $user->id;
        $data['email'] = $user->id;
        // Create a new code
        $codeData = PasswordResetToken::create($data);
        $resetUrl =  "http://localhost:4200/reset-password/". $data['token'];

        Mail::to($request->email)->send(new SendCodeResetPassword($codeData->token, $resetUrl));

        return response(['message' => 'password_sent'], 200);
    }
}
