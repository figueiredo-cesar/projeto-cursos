import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    GoogleSigninButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public form: FormGroup
  public validCredentials = true

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly router: Router,
    private authService: SocialAuthService
  ){
    this.form = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.minLength(6) ]]
    })

    this.authService.authState.subscribe((user) => {
      console.log(user)
      this.loginService.loginWithGoogle(user.idToken).subscribe({
        next: (response) => {
          console.log('Login bem-sucedido!', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          if (error.error.error === 'unauthorized') {
            console.log(error.error.error)
            this.validCredentials = false
          }
          console.error('Erro no login', error);
        }
      });
    });
  }

  public sigin(){
    this.loginService.login(this.form.value).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido!', response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        if (error.error.error === 'unauthorized') {
          console.log(error.error.error)
          this.validCredentials = false
        }
        console.error('Erro no login', error);
      }
    });
  }
}
