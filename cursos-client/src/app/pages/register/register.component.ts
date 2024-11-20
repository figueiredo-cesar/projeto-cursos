import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomValidator } from '../../utils/custom.validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  public form: FormGroup

  constructor(
    private readonly registerService: RegisterService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, CustomValidator.whitespace() ]],
      lastname: ['', [Validators.required, CustomValidator.whitespace() ]],
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required, CustomValidator.strongPassword() ]]
    })
  }

  sigup(){
    this.registerService.sigup(this.form.value).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido!', response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        if (error?.error?.errors?.email?.includes('email_already_used')){
          this.form.get('email')?.setErrors({ emailInUse: true });
        }
      }
    });
  }

  hasError(control: any): boolean {
    return control?.invalid && (control?.dirty || control?.touched)
  }

}
