import { AuthService } from '../../api-service/auth.service';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private readonly authService: AuthService
  ) { }

  public login(credentials: {email: string, password: string}) {
    return this.authService.login(credentials)
  }

  public logout(): void {
    this.authService.logout()
  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  public loginWithGoogle(token: string) {
    return this.authService.loginWithGoogle({token})
  }
}
