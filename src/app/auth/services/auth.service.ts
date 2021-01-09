import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {catchError, mapTo, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {config} from '../../config';
import {Tokens} from '../models/tokens';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorHandlerService} from '../../share/error-handler';
import {RoleService} from '../../user/services/role.service';
import {UserRegister} from '../models/user-register';
import {UserResetPassword} from '../models/user-reset-password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  private loggedUser: string;

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {
  }

  login(user: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/authenticate`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.email, tokens)),
        mapTo(true),
        catchError((err) => this.errorHandlerService.handleError(err)));
  }

  register(userRegister: UserRegister): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/register`, userRegister)
      .pipe(
        mapTo(true),
        catchError((err) => this.errorHandlerService.handleError(err)
        ));
  }

  logout(): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/removeToken`, {
      refreshToken: this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        console.log(error);
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

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  private doLoginUser(email: string, tokens: Tokens): void {
    this.loggedUser = email;
    this.storeTokens(tokens);
  }

  public doLogoutUser(): void {
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

  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/forgot_password/${email}`, null)
      .pipe(
        mapTo(true),
        catchError((err) => this.errorHandlerService.handleError(err)));
  }

  resetPassword(userResetPassword: UserResetPassword): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/reset_password`, userResetPassword)
      .pipe(
        mapTo(true),
        catchError((err) => this.errorHandlerService.handleError(err)));
  }
}
