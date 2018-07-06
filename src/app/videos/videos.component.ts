import {Component, OnInit} from '@angular/core';
import {VideoService} from './video.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  videos = [];
  selectedVideo = null;

  constructor(private videoService: VideoService) {
  }

  ngOnInit() {
    this.getVideos();
  }

  onSelect(video): void {
    this.selectedVideo = video;
  }

  getVideos(): void {
    this.videoService.getVideos()
      .subscribe(videos => this.videos = videos);
  }
}
