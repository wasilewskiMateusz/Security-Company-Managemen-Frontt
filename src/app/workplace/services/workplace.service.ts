import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from '../../share/error-handler';
import {Workplace} from '../models/workplace';
import {Observable} from 'rxjs';
import {config} from '../../config';
import {catchError, mapTo} from 'rxjs/operators';
import {CreateWorkplace} from '../models/create-workplace';
import {UserAvailability} from '../../user/models/user-availability';
import {User} from '../../user/models/user';

@Injectable({
  providedIn: 'root'
})
export class WorkplaceService {


  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {
  }

  createWorkplace(createWorkplace: CreateWorkplace): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/workplaces`, createWorkplace)
      .pipe(
        mapTo(true),
        catchError((err) => this.errorHandlerService.handleError(err)
        ));
  }
}
