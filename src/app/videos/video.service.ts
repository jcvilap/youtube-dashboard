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

  private getUrl({q = '', maxResults = 25, part = 'snippet', key = this.apiKey}): string {
    return `${this.baseUrl}search?q=${q}&key=${key}&maxResults=${maxResults}&part=${part}`;
  }

  getVideos(options = {}): Observable<any> {
    return this.http.get<any>(this.getUrl(options)).pipe(
      map(({items}) => items),
      tap(videos => {
        console.log(videos);
        return this.log(`fetched videos`);
      }),
      catchError(this.handleError('getVideos', {}))
    );
  }


  /** GET video by id. Will 404 if id not found */
  getVideo(id: number): Observable<any> {
    const url = `${this.getUrl({})}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched video id=${id}`)),
      catchError(this.handleError<any>(`getVideo id=${id}`))
    );
  }

  /* GET videos whose name contains search term */
  searchVideos(term: string): Observable<any[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.getVideos({q: term, maxResults: 10});
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
