import {Component, OnInit} from '@angular/core';
import {VideoService} from '../../services/video.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites = [];

  constructor(private videoService: VideoService) {
  }

  ngOnInit() {
    this.getFavorites();
  }

  getFavorites(): void {
    const ids = JSON.parse(sessionStorage.getItem('favorites')) || [];
    this.videoService.getVideoByIds(ids.length > 1 ? ids.join(',') : ids[0])
      .subscribe(favorites => {
        this.favorites = favorites.length ? favorites : [favorites];
      });
  }
}
