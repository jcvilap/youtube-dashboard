import {Component, OnInit} from '@angular/core';
import {VideoService} from '../videos/video.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  videos = [];

  constructor(private videoService: VideoService) {
  }

  ngOnInit() {
    this.getVideos();
  }

  getVideos(q = '', maxResults = 8): void {
    this.videoService.getVideos({maxResults, q})
      .subscribe(videos => {
        this.videos = videos.slice();
      });
  }

  loadVideos(term) {
    this.getVideos(term, 25);
  }
}
