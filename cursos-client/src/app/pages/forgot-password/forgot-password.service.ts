import { Injectable } from '@angular/core';
import { AuthService } from '../../api-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(
    private readonly authService: AuthService
  ) { }

  public forgotPassword(email: string) {
    return this.authService.forgotPassword(email)
  }
}
