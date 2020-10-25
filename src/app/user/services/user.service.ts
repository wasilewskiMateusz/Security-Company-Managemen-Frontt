import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from '../../share/error-handler';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {config} from '../../config';
import {catchError, mapTo, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[];


  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<any>(`${config.apiUrl}/users`)
      .pipe(
        catchError((err) => this.errorHandlerService.handleError(err)));
  }

  setUsers(users: User[]): void {
    this.users = users;
  }

}
