<?php

namespace App\Http\Controllers;

use App\Models\PasswordResetToken;
use App\Models\User;
use Illuminate\Http\Request;

class ResetPasswordController extends Controller
{
    //
    public function __invoke(Request $request)
    {
        $request->validate([
            'token' => 'required|string|exists:password_reset_tokens',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // find the code
        $passwordReset = PasswordResetToken::firstWhere('token', $request->token);

        if ($passwordReset->expiredet_at > now()) {
            return response(['message' => trans('passwords.code_is_expire')], 422);
        }



        $user = User::find($passwordReset->user_id);
        $user->update($request->only('password'));

        return response(['message' => 'password has been successfully reset'], 200);
    }
}
