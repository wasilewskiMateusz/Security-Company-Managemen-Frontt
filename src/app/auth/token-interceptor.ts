import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {Tokens} from './models/tokens';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.getAccessToken() !== null) {

        req = this.addToken(req, this.authService.getAccessToken());

        return next.handle(req).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            return this.handle401Error(req, next);
          }
          if (error instanceof HttpErrorResponse && error.status === 404) {
            this.router.navigateByUrl('/not-found', {replaceUrl: true});
          }
          if (error instanceof HttpErrorResponse && error.status === 403) {
            this.router.navigateByUrl('/forbidden', {replaceUrl: true});
          }
          if (error instanceof HttpErrorResponse && error.status === 500) {
            this.router.navigateByUrl('/server-error', {replaceUrl: true});
          }else {
            return throwError(error);
          }
        })
      ) as Observable<HttpEvent<any>>;
    }
    else {
      return next.handle(req);
    }
  }

  private addToken(req: HttpRequest<any>, token: string): any {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: Tokens) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.accessToken);
          return next.handle(this.addToken(req, token.accessToken));
        }),
        catchError(async (error) => {
          this.authService.doLogoutUser();
          this.router.navigate(['login']);
          this.snackBar.open(error.error.message, '', {
            duration: 4000,
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          }); })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(accessToken => {
          return next.handle(this.addToken(req, accessToken));
        })
      );
    }
  }

}
