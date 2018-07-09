import {Component, OnInit} from '@angular/core';
import {VideoService} from '../../services/video.service';

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
    const subscription = this.videoService.searchVideos(this.options)
      .subscribe(videos => {
        this.videos = videos.slice();
        subscription.unsubscribe();
      });
  }

  loadVideos(q) {
    const isTopResults = !q;
    this.options.q = q;
    this.options.maxResults = isTopResults ? 8 : 25;
    if (isTopResults) {
      this.options.order = 'relevance';
    }
    this.getVideos();
  }
}
