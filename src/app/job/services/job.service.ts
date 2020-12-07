import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from '../../share/error-handler';
import {Observable} from 'rxjs';
import {config} from '../../config';
import {catchError, mapTo} from 'rxjs/operators';

import {Job} from '../models/job';
import {Contract} from '../models/contract';
import {CreateJob} from '../models/create-job';

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

  createJob(createJob: CreateJob): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/jobs`, createJob)
      .pipe(
        mapTo(true),
        catchError((err) => this.errorHandlerService.handleError(err)
        ));
  }

  disableJob(id: number, version: string): Observable<Job> {
    return this.http.put<any>(`${config.apiUrl}/jobs/${id}/disability`, {version})
      .pipe(
        catchError((err) => this.errorHandlerService.handleError(err)));
  }
}
