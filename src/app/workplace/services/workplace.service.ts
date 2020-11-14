import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from '../../share/error-handler';
import {Workplace} from '../models/workplace';
import {Observable} from 'rxjs';
import {config} from '../../config';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkplaceService {


  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {
  }

}
