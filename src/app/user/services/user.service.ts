import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from '../../share/error-handler';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {config} from '../../config';
import {catchError} from 'rxjs/operators';
import {UserEdit} from '../models/user-edit';
import {UserAvailability} from '../models/user-availability';
import {UserPasswordEdit} from '../models/user-password-edit';
import {UserRole} from '../models/user-role';
import {UserOwnPasswordEdit} from '../models/user-own-password-edit';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<any>(`${config.apiUrl}/users`)
      .pipe(
        catchError((err) => this.errorHandlerService.handleError(err)));
  }

  getUser(id: number): Observable<User> {
    return this.http.get<any>(`${config.apiUrl}/users/${id}`)
      .pipe(
        catchError((err) => this.errorHandlerService.handleError(err)));
  }

  editUser(userEdit: UserEdit, id: number): Observable<User> {
    return this.http.put<any>(`${config.apiUrl}/users/${id}`, userEdit)
      .pipe(
        catchError((err) => this.errorHandlerService.handleError(err)
        ));
  }

  changeAvailability(userAvailability: UserAvailability, id: number): Observable<User> {
    return this.http.put<any>(`${config.apiUrl}/users/${id}/availability`, userAvailability)
      .pipe(
        catchError((err) => this.errorHandlerService.handleError(err)
        ));
  }

  changePassword(userPasswordEdit: UserPasswordEdit, id: number): Observable<User> {
    return this.http.put<any>(`${config.apiUrl}/users/${id}/password`, userPasswordEdit)
      .pipe(
        catchError((err) => this.errorHandlerService.handleError(err)
        ));
  }

  changeOwnPassword(userOwnPasswordEdit: UserOwnPasswordEdit, id: number): Observable<User> {
    return this.http.put<any>(`${config.apiUrl}/users/${id}/own-password`, userOwnPasswordEdit)
      .pipe(
        catchError((err) => this.errorHandlerService.handleError(err)
        ));
  }

  changeRoles(userRole: UserRole, id: number): Observable<User> {
    return this.http.put<any>(`${config.apiUrl}/users/${id}/roles`, userRole)
      .pipe(
        catchError((err) => this.errorHandlerService.handleError(err)
        ));
  }
}
