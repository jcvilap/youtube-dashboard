import { Component, OnInit } from '@angular/core';
import { VIDEOS } from '../mock-videos';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  videos = VIDEOS;
  selectedVideo = null;


  constructor(private videoService: VideoService) { }

  ngOnInit() {
  }

  onSelect(video): void {
    this.selectedVideo = video;
  }

  getHeroes(): void {
    this.videoService.getVideos()
      .subscribe(videos => this.videos = videos);
  }
}
