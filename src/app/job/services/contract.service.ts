import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from '../../share/error-handler';
import {Observable} from 'rxjs';
import {config} from '../../config';
import {catchError, mapTo} from 'rxjs/operators';

import {Job} from '../models/job';
import {CreateWorkplace} from '../../workplace/models/create-workplace';
import {CreateContract} from '../models/create-contract';

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
}
