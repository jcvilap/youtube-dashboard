import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VideoService} from '../../services/video.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  video;
  comments;

  constructor(private route: ActivatedRoute,
              private videoService: VideoService) {
  }

  ngOnInit(): void {
    this.getVideo();
    this.getComments();
  }

  getVideo(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.videoService.getVideoByIds(id)
      .subscribe(videos => this.video = videos[0]);
  }

  getComments(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.videoService.getVideoComments(id)
      .subscribe(comments => this.comments = comments);
  }

  toggleFavorite() {
    const id = this.route.snapshot.paramMap.get('id');
    const favs = JSON.parse(sessionStorage.getItem('favorites')) || [];
    if (favs.includes(id)) {
      favs.splice(favs.indexOf(id), 1);
    } else {
      favs.push(id);
    }
    sessionStorage.setItem('favorites', JSON.stringify(favs));
  }

  isFav() {
    const favs = JSON.parse(sessionStorage.getItem('favorites')) || [];
    const id = this.route.snapshot.paramMap.get('id');
    return favs.includes(id);
  }


  @HostListener('window:resize')
  onResize() {
    this.getVideo();
  }
}
