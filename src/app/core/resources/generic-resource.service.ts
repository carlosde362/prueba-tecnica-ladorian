import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericResourceService {

  constructor(private http: HttpClient) { }

  serverRequest<T, U>(method: HttpMethod,
                   url: string,
                   project: (input: T) => U,
                   options: RequestOptionsArgs = {}): Observable<U> {
    return this.http.request<T>(method, url, options).pipe(catchError(this.handleError), map(project))
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => `Error ${error.message} with code ${error.status}`);
  }
}

export type HttpMethod = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATH';

export interface Pairs {
  [key: string]: string;
}

export interface RequestOptionsArgs {
  headers?: Pairs;
  params?: HttpParams;
  body?: string
}
