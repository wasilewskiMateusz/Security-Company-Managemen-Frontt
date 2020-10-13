import { Injectable } from '@angular/core';
import {LoginCredentials} from './login/login-credentials';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  login(userEmail: string, userPassword: string): Observable<any> {
    const body = {
      email: userEmail,
      password: userPassword
    };
    return this.http.post<any>('http://localhost:8080/api/authenticate', body).pipe(
      tap(_ => console.log(_))
    );
  }
}
