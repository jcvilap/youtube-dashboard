import {Component, OnInit} from '@angular/core';
import {VideoService} from '../videos/video.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  videos = [];
  options = {
    order: 'relevance',
    q: '',
    maxResults: 8
  };

  constructor(private videoService: VideoService) {
  }

  ngOnInit() {
    this.getVideos();
  }

  getVideos() {
    const subscription = this.videoService.getVideos(this.options)
      .subscribe(videos => {
        this.videos = videos.slice();
        subscription.unsubscribe();
      });
  }

  loadVideos(q) {
    this.options.q = q;
    this.options.maxResults = q ? 25 : 8;
    this.getVideos();
  }
}
