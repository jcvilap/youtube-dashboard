import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class VideoService {

  apiKey = 'AIzaSyAc0ZzsLxkU1InVbDgRYoIg08bPouK-o8M';
  baseUrl = 'https://content.googleapis.com/youtube/v3/';

  constructor(private http: HttpClient) {
  }

  searchVideos(options = {}): Observable<any> {
    const {q, maxResults, part, key, order} = {
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
      catchError(this.handleError('searchVideos', {}))
    );
  }

  getVideoByIds(idString): Observable<any> {
    const {id, maxResults, part, key, maxWidth} = {
      id: idString,
      maxResults: 25,
      part: 'snippet,player,statistics',
      key: this.apiKey,
      maxWidth: window.innerWidth
    };
    const url = `${this.baseUrl}videos?&key=${key}&id=${id}&maxResults=${maxResults}&part=${part}&maxWidth=${maxWidth}`;
    return this.http.get<any>(url).pipe(
      map(({items}) => items),
      catchError(this.handleError<any>('getVideoByIds'))
    );
  }

  lookupVideos(term: string): Observable<any[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.searchVideos({q: term, maxResults: 10});
  }

  getVideoComments(videoId: string): Observable<any> {
    const {maxResults, part, key} = {
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
