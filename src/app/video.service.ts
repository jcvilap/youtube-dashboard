import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {MessageService} from './message.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})
export class VideoService {

  private videosUrl = 'api/videos';  // URL to web api

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  /** GET videos from the server */
  getVideos(): Observable<any[]> {
    return this.http.get<any[]>(this.videosUrl)
      .pipe(
        tap(videos => this.log(`fetched videos`)),
        catchError(this.handleError('getVideos', []))
      );
  }

  /** GET video by id. Return `undefined` when id not found */
  getVideoNo404<Data>(id: number): Observable<any> {
    const url = `${this.videosUrl}/?id=${id}`;
    return this.http.get<any[]>(url)
      .pipe(
        map(videos => videos[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} video id=${id}`);
        }),
        catchError(this.handleError<any>(`getVideo id=${id}`))
      );
  }

  /** GET video by id. Will 404 if id not found */
  getVideo(id: number): Observable<any> {
    const url = `${this.videosUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched video id=${id}`)),
      catchError(this.handleError<any>(`getVideo id=${id}`))
    );
  }

  /* GET videos whose name contains search term */
  searchVideos(term: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty video array.
      return of([]);
    }
    return this.http.get<any[]>(`${this.videosUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found videos matching "${term}"`)),
      catchError(this.handleError<any[]>('searchVideos', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new video to the server */
  addVideo(video: any): Observable<any> {
    return this.http.post<any>(this.videosUrl, video, httpOptions).pipe(
      tap((video: any) => this.log(`added video w/ id=${video.id}`)),
      catchError(this.handleError<any>('addVideo'))
    );
  }

  /** DELETE: delete the video from the server */
  deleteVideo(video: any | number): Observable<any> {
    const id = typeof video === 'number' ? video : video.id;
    const url = `${this.videosUrl}/${id}`;

    return this.http.delete<any>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted video id=${id}`)),
      catchError(this.handleError<any>('deleteVideo'))
    );
  }

  /** PUT: update the video on the server */
  updateVideo(video: any): Observable<any> {
    return this.http.put(this.videosUrl, video, httpOptions).pipe(
      tap(_ => this.log(`updated video id=${video.id}`)),
      catchError(this.handleError<any>('updateVideo'))
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
