import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{


  constructor(public authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    if (this.authService.getAccessToken()){
      req = this.addToken(req, this.authService.getAccessToken());
    }


    return next.handle(req).pipe(
      catchError
    );



  }

  private addToken(req: HttpRequest<any>, token: string): any{
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

}
