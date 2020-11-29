import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from '../../share/error-handler';
import {Observable} from 'rxjs';
import {config} from '../../config';
import {catchError} from 'rxjs/operators';

import {Job} from '../models/job';
import {Contract} from '../models/contract';
import {User} from '../../user/models/user';

@Injectable({
  providedIn: 'root'
})
export class JobService {


  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {
  }

  getJobs(): Observable<Job[]> {
    return this.http.get<any>(`${config.apiUrl}/jobs`)
      .pipe(
        catchError((err) => this.errorHandlerService.handleError(err)));
  }

  getMyContracts(id: number): Observable<Contract[]> {
    return this.http.get<any>(`${config.apiUrl}/users/${id}/contracts`)
      .pipe(
        catchError((err) => this.errorHandlerService.handleError(err)));
  }

  getJobContracts(id: number): Observable<Contract[]> {
    return this.http.get<any>(`${config.apiUrl}/jobs/${id}/contracts`)
      .pipe(
        catchError((err) => this.errorHandlerService.handleError(err)));
  }

}
