import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from '../../share/error-handler';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {config} from '../../config';
import {catchError, map, mapTo, tap} from 'rxjs/operators';
import {UserEdit} from '../models/user-edit';
import {Role} from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {


  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<any>(`${config.apiUrl}/roles`)
      .pipe(
        catchError((err) => this.errorHandlerService.handleError(err)));
  }
}
