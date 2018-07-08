import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from '../messages/message.service';

@Injectable({providedIn: 'root'})
export class VideoService {

  apiKey = 'AIzaSyAc0ZzsLxkU1InVbDgRYoIg08bPouK-o8M';
  baseUrl = 'https://content.googleapis.com/youtube/v3/';

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  private getSearchUrl({q = '', maxResults = 25, part = 'snippet', key = this.apiKey, order = 'relevance'}): string {
    return `${this.baseUrl}search?q=${q}&key=${key}&order=${order}&maxResults=${maxResults}&part=${part}`;
  }

  private getVideosUrl({id = '', maxResults = 25, part = 'snippet,player,statistics', key = this.apiKey}): string {
    return `${this.baseUrl}videos?&key=${key}&id=${id}&maxResults=${maxResults}&part=${part}`;
  }

  searchVideos(options = {}): Observable<any> {
    return this.http.get<any>(this.getSearchUrl(options)).pipe(
      map(({items}) => items),
      tap(videos => {
        console.log(videos);
        return this.log(`fetched videos`);
      }),
      catchError(this.handleError('searchVideos', {}))
    );
  }

  getVideo(videoId: string): Observable<any> {
    const url = this.getVideosUrl({id: videoId} as any);
    return this.http.get<any>(url).pipe(
      map(({items}) => items[0]),
      tap(video => {
        console.log(video);
        return this.log(`fetched video id=${videoId}`);
      }),
      catchError(this.handleError<any>(`getVideo id=${videoId}`))
    );
  }

  lookupVideos(term: string): Observable<any[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.searchVideos({q: term, maxResults: 10});
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a VideoService message with the MessageService */
  private log(message: string) {
    this.messageService.add('VideoService: ' + message);
  }
}
