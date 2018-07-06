import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from '../messages/message.service';

@Injectable({providedIn: 'root'})
export class VideoService {
  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  private getUrl(q = ''): string {
    let url = 'https://content.googleapis.com/youtube/v3/search?q=';
    url += q;
    url += '&maxResults=25&part=snippet&key=AIzaSyAc0ZzsLxkU1InVbDgRYoIg08bPouK-o8M';
    return url;
  }

  /** GET videos from the server */
  getVideos(): Observable<any> {
    return this.http.get<any>(this.getUrl()).pipe(
      map(({items}) => items),
      tap(videos => {
        console.log(videos);
        return this.log(`fetched videos`);
      }),
      catchError(this.handleError('getVideos', {}))
    );
  }

  /** GET video by id. Return `undefined` when id not found */
  getVideoNo404<Data>(id: number): Observable<any> {
    const url = `${this.getUrl()}/?id=${id}`;
    return this.http.get<any[]>(url).pipe(
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
    const url = `${this.getUrl()}/${id}`;
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
    return this.http.get<any[]>(this.getUrl(term)).pipe(
      tap(_ => this.log(`found videos matching "${term}"`)),
      catchError(this.handleError<any[]>('searchVideos', []))
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
