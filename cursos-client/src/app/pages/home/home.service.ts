import { Injectable } from '@angular/core';
import { CourseService } from '../../api-service/course.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private readonly courseService: CourseService
  ) {

  }

  getAll(): Promise<any> {
    return firstValueFrom(this.courseService.getAll())
      .then(response => {
        return response;
      })
      .catch(error => {
        // Trate o erro aqui, se necessário
        throw error;
      });
  }
}
