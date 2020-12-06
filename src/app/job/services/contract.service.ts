import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from '../../share/error-handler';
import {Observable} from 'rxjs';
import {config} from '../../config';
import {catchError, mapTo} from 'rxjs/operators';
import {CreateContract} from '../models/create-contract';
import {Contract} from '../models/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {


  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {
  }

  createContract(createContract: CreateContract): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/contracts`, createContract)
      .pipe(
        mapTo(true),
        catchError((err) => this.errorHandlerService.handleError(err)
        ));
  }

  deleteContract(id: number): Observable<boolean> {
    return this.http.delete<any>(`${config.apiUrl}/contracts/${id}`)
      .pipe(
        mapTo(true),
        catchError((err) => this.errorHandlerService.handleError(err)
        ));
  }

  checkInContract(id: number, version: string): Observable<Contract> {
    return this.http.put<any>(`${config.apiUrl}/contracts/${id}/presence`, {version})
      .pipe(
        catchError((err) => this.errorHandlerService.handleError(err)
        ));
  }
}
