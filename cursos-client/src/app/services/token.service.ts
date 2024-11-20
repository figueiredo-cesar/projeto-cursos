import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) { }

  authenticated(){
    const token = window.localStorage.getItem('token');

    if (token) {
      const decodedToken = this.decodeToken(token);

      if (this.isTokenExpired(decodedToken)) {
        this.router.navigate(['']);
        return false;
      }

      return true;
    }

    this.router.navigate(['']);
    return false;
  }

  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Token inválido:', error);
      return null;
    }
  }

  private isTokenExpired(decodedToken: any): boolean {
    if (!decodedToken || !decodedToken.exp) {
      return true;
    }

    const expirationDate = new Date(decodedToken.exp * 1000); // 'exp' está em segundos, converta para milissegundos
    const currentDate = new Date();

    return expirationDate < currentDate;
  }
}
