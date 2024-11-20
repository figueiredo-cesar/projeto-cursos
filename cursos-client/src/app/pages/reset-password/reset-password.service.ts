import { Injectable } from '@angular/core';
import { AuthService } from '../../api-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(
    private readonly authService: AuthService
  ) { }

  public resetPassword(params: any) {
    return this.authService.resetPassword(params)
  }
}
