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
    this.videoService.getVideo(id)
      .subscribe(video => this.video = video);
  }

  getComments(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.videoService.getVideoComments(id)
      .subscribe(comments => this.comments = comments);
  }

  toggleFavorite() {
    const id = this.route.snapshot.paramMap.get('id');
    const isFavorite = this.isFav();
    if (isFavorite) {
      sessionStorage.removeItem(id);
    } else {
      sessionStorage.setItem(id, 'favorite');
    }
  }

  isFav() {
    const id = this.route.snapshot.paramMap.get('id');
    return sessionStorage.getItem(id) === 'favorite';
  }


  @HostListener('window:resize')
  onResize() {
    this.getVideo();
  }
}
