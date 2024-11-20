import { HomeService } from './home.service';
import { Component } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    YouTubePlayerModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  videoId = 'QIZ9aZD6vs0';
  height = 200;
  width = 400;

  courses = [] as any

  constructor(
    private readonly homeService: HomeService
  ) {

  }

  async ngOnInit(){
    const response = await this.homeService.getAll();

    console.log(response.data)
    this.courses = response.data
  }

}
