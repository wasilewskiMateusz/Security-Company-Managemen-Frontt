import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from '../../share/error-handler';
import {User} from '../models/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {config} from '../../config';
import {catchError, map, mapTo, tap} from 'rxjs/operators';
import {UserEdit} from '../models/user-edit';
import {Role} from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public loggedUserRoles: string[];
  public loggedUserCurrentRole: BehaviorSubject<string> = new BehaviorSubject<string>('');


  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {
  }

  loadRoles(): void {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const loggedUserRoles = JSON.parse(atob(token.split('.')[1])).roles;
    const loggedUserCurrentRole = JSON.parse(atob(token.split('.')[1])).roles[0];
    this.loggedUserRoles = loggedUserRoles;
    this.loggedUserCurrentRole.next(loggedUserCurrentRole);

  }

  getRoles(): Observable<Role[]> {
    return this.http.get<any>(`${config.apiUrl}/roles`)
      .pipe(
        catchError((err) => this.errorHandlerService.handleError(err)));
  }


}
