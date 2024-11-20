import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  public url = `${environment.api}/courses`  

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAll() {
    return this.http.get(this.url)
  }
}
