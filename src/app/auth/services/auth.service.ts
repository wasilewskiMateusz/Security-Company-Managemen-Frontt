import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, mapTo, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {config} from '../../config';
import {Tokens} from '../models/tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient) { }


  login(user: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/authenticate`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.email, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error.message);
          return of(false);
        }));
  }


  private doLoginUser(email: string, tokens: Tokens): void {
    this.loggedUser = email;
    this.storeTokens(tokens);
  }

  private storeTokens(tokens: Tokens): void {
    localStorage.setItem(this.ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }
}
