import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from '../components/messages/message.service';

@Injectable({providedIn: 'root'})
export class VideoService {

  apiKey = 'AIzaSyAc0ZzsLxkU1InVbDgRYoIg08bPouK-o8M';
  baseUrl = 'https://content.googleapis.com/youtube/v3/';

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  searchVideos(options = {}): Observable<any> {
    const { q, maxResults, part, key, order} = {
      q: '',
      maxResults: 25,
      part: 'snippet',
      key: this.apiKey,
      order: 'relevance',
      ...options
    };
    const url = `${this.baseUrl}search?q=${q}&key=${key}&order=${order}&maxResults=${maxResults}&part=${part}`;
    return this.http.get<any>(url).pipe(
      map(({items}) => items),
      tap(videos => this.log(`fetched videos`)),
      catchError(this.handleError('searchVideos', {}))
    );
  }

  getVideo(videoId: string): Observable<any> {
    const { id, maxResults, part, key, maxWidth} = {
      id: videoId,
      maxResults: 25,
      part: 'snippet,player,statistics',
      key: this.apiKey,
      maxWidth: window.innerWidth
    };
    const url = `${this.baseUrl}videos?&key=${key}&id=${id}&maxResults=${maxResults}&part=${part}&maxWidth=${maxWidth}`;
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

  getVideoComments(videoId: string): Observable<any> {
    const { maxResults, part, key} = {
      maxResults: 50,
      part: 'snippet',
      key: this.apiKey
    };
    const url = `${this.baseUrl}commentThreads?&key=${key}&videoId=${videoId}&maxResults=${maxResults}&part=${part}`;
    return this.http.get<any>(url).pipe(
      map(({items}) => items),
      catchError(this.handleError<any>(`getVideo id=${videoId}`))
    );
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
