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
import {EditWorkplace} from '../models/edit-workplace';
import {Job} from '../../job/models/job';
import {RateWorkplace} from '../models/rate-workplace';

@Injectable({
  providedIn: 'root'
})
export class RateService {


  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {
  }

  createWorkplace(createWorkplace: CreateWorkplace): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/workplaces`, createWorkplace)
      .pipe(
        mapTo(true),
        catchError((err) => this.errorHandlerService.handleError(err)
        ));
  }

  rate(ratedWorkplace: RateWorkplace): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/rates`, ratedWorkplace)
      .pipe(
        mapTo(true),
        catchError((err) => this.errorHandlerService.handleError(err)
        ));
  }
}
