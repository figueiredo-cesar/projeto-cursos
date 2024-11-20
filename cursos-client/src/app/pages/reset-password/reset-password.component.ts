import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResetPasswordService } from './reset-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomValidator } from '../../utils/custom.validator';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ 
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  public form: FormGroup
  public message: boolean = false

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly resetPasswordService: ResetPasswordService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      token: [this.activatedRoute.snapshot.params["id"]],
      password: ['', [Validators.required, Validators.minLength, CustomValidator.strongPassword()]],
      password_confirmation: ['', [Validators.required]],
    }, { validator: CustomValidator.passwordMatch('password', 'password_confirmation') })
  }

  public submit() {
    this.resetPasswordService.resetPassword(this.form.value).subscribe({
      next: (response) => {
        this.message = true
      },
      error: (error) => {
        this.message = true
      }
    })
  }

  hasError(control: any): boolean {
    console.log(control)
    return control?.invalid && (control?.dirty || control?.touched)
  }

}
