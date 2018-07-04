import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VIDEOS } from './mock-videos';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class VideoService {

  constructor(private messageService: MessageService) { }

  getVideos(): Observable<any[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('VideoService: fetched videos');
    return of(VIDEOS);
  }
}
