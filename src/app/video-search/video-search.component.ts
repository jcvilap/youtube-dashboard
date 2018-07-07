import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {VideoService} from '../videos/video.service';

@Component({
  selector: 'app-video-search',
  templateUrl: './video-search.component.html',
  styleUrls: ['./video-search.component.css']
})
export class VideoSearchComponent implements OnInit {
  @Output() enterPressed = new EventEmitter;
  videos$: Observable<any[]>;
  private searchTerms = new Subject<string>();

  constructor(private videoService: VideoService) {
  }

  // Push a search term into the observable stream.
  search($event: KeyboardEvent, term: string): void {
    if ($event.key === 'Enter') {
      this.enterPressed.emit(term);
      this.searchTerms.next('');
    } else {
      this.searchTerms.next(term);
    }
  }

  ngOnInit(): void {
    this.videos$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (term) {
          return this.videoService.searchVideos(term);
        } else {
          return of([]);
        }
      }),
    );
  }
}
