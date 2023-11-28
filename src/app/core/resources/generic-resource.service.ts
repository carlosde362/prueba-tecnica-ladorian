import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class GenericResourceService {

  constructor(private http: HttpClient) { }

  serverRequest<T>(method: HttpMethod, url: string, options: RequestOptionsArgs = {}): Observable<T> {
    return this.http.request<T>(method, url, options).pipe(catchError(this.handleError))
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
