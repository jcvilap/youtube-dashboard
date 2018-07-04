import { Component, OnInit } from '@angular/core';
import { VIDEOS } from '../mock-videos';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  videos = VIDEOS;
  selectedVideo = null;
  constructor() { }

  ngOnInit() {
  }

  onSelect(video): void {
    this.selectedVideo = video;
  }
}
