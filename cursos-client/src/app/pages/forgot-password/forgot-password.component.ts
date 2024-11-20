import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotPasswordService } from './forgot-password.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  public form: FormGroup
  public message: boolean = false

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly forgotPasswordService: ForgotPasswordService,
    private readonly router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  public submit() {
    this.forgotPasswordService.forgotPassword(this.form.value).subscribe({
      next: (response) => {
        this.message = true
      },
      error: (error) => {
        this.message = true
      }
    })
  }
}
