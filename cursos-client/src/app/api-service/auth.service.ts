import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.api
  constructor(
    private readonly http: HttpClient
  ) { }

  public login(credentials: { email: string, password: string }) {
    return this.http.post<any>(`${this.url}/auth/login`, credentials).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', response.user);
        }
      })
    )
  }

  public loginWithGoogle(params: {token: string}) {
    return this.http.post<any>(`${this.url}/auth/social-register`, params).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', response.user);
        }
      })
    )
  }

  public resgister(user:any) {
    return this.http.post<any>(`${this.url}/auth/register`, user).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', response.user);
        }
      })
    )
  }
  
  public logout(): void {
    localStorage.removeItem('token');
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  public forgotPassword(email: string) {
    return this.http.post<any>(`${this.url}/auth/forgot`, email)
  }

  public resetPassword(params: any) {
    return this.http.post<any>(`${this.url}/auth/reset`, params)
  }
}
