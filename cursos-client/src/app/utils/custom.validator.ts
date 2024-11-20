import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidator {
    static strongPassword(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) {
                return null;
            }

            const hasUpperCase = /[A-Z]+/.test(value);
            const hasLowerCase = /[a-z]+/.test(value);
            const hasNumeric = /[0-9]+/.test(value);
            const hasMinLength = value.length >= 6;

            const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasMinLength;

            return !passwordValid ? { strongPassword: true } : null;
        };
    }

    static whitespace(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (control.value && control.value.trim().length === 0) {
                return { 'whitespace': true };
            }
            return null;
        };
    }

  static passwordMatch(password: string, confirmPassword: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const passwordControl = control.get(password);
      const confirmPasswordControl = control.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    }
  }
}
