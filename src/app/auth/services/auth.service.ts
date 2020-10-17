import {Injectable} from '@angular/core';
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

  constructor(private http: HttpClient) {
  }

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

  logout(): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/logout`, {
      refreshToken: this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.message);
        return of(false);
      })
    );
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(`${config.apiUrl}/refresh`, {
      refreshToken: this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => this.storeAccessToken(tokens.accessToken)));
  }

  getAccessToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  isLoggedIn(): boolean{
    return !!this.getAccessToken();
  }

  private doLoginUser(email: string, tokens: Tokens): void {
    this.loggedUser = email;
    this.storeTokens(tokens);
  }
  private doLogoutUser(): void {
    this.loggedUser = null;
    this.removeTokens();
  }

  private storeTokens(tokens: Tokens): void {
    localStorage.setItem(this.ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeAccessToken(accessToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
  }
  private removeTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

}
