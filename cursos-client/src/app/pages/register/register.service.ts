import { lastValueFrom } from 'rxjs';
import { AuthService } from './../../api-service/auth.service';
import { UserService } from './../../api-service/user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private readonly authService: AuthService
  ) { }

  sigup(user: any) {
    return this.authService.resgister(user)
  }

}
