import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = `${environment.api}/users`  

  constructor(
    private readonly http: HttpClient
  ) { }

  save(user: any) {
    if(user.id) {
      const url = `${this.url}/${user.id}`
      return this.http.put<any>(url, user)
    }

    return this.http.post<any>(this.url, user)
  }


}
