@component('mail::message')
<h1>We have received your request to reset your account password</h1>
The allowed duration of the code is one hour from the time the message was sent.

@component('mail::button', ['url' => $resetUrl])
Reset Password
@endcomponent

<p>The allowed duration of the code is one hour from the time the message was sent</p>
@endcomponent