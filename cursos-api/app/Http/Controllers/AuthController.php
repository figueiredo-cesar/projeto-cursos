<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\Login;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'authenticateWithGoogle']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {

        $credentials = $request->only('email', 'password');

        $token = JWTAuth::attempt($credentials);

        if (!$token) {
            return response()->json(['error' => 'unauthorized'], 401);
        }

        $user = JWTAuth::user();

        Login::create([
            'user_id' => $user->id,
            'token' => $token
        ]);

        return response()->json([
            'token' => $token,
            'user' => $user
        ]);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(JWTAuth::refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'user' => JWTAuth::user()->toArray(),
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ], [
            'email.unique' => 'email_already_used',
        ]);

        $user = User::create([
            'name' => $request->name,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => $request->password,
        ]);


        $token = Auth::login($user);

        dd($token);

        Login::create([
          'user_id' => $user->id,
          'token' => $token
        ]);
        return $this->respondWithToken($token);
    }

  public function authenticateWithGoogle(Request $request)
  {
    $parts = explode('.', $request->token);

    try {
      if (count($parts) !== 3) {
        return response()->json(['error' => 'Token JWT inválido'], 400);
      }

      $payload = json_decode(base64_decode($parts[1]), true);

      if (json_last_error() !== JSON_ERROR_NONE) {
        return response()->json(['error' => 'Erro ao decodificar o payload'], 400);
      }

      $email = $payload['email'];
      $name = $payload['given_name'];
      $lastname = $payload['family_name'];

      $user = User::where('email', $email)->first();

      if (!$user) {
        $user = User::create([
          'email' => $email,
          'name' => $name,
          'lastname' => $lastname,
          'password' => mt_rand(100000, 999999),
          'provider' => 'google'
        ]);
      }

      $token = Auth::login($user);

      Login::create([
        'user_id' => $user->id,
        'token' => $token
      ]);

      return $this->respondWithToken($token);
    } catch (JWTException $e) {
      return response()->json(['error' => 'Token inválido'], 400);
    }
  }
}
