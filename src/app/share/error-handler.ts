import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {


  constructor(private snackBar: MatSnackBar) {
  }

  public handleError(error): Observable<any> {

    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {

      // client-side error

      errorMessage = error.error.message;

      this.snackBar.open(errorMessage, '', {
        duration: 4000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });

    } else {
      errorMessage = error.error.message;


      if (error.status !== 403 && error.status !== 404 && error.status !== 500) {
        this.snackBar.open(errorMessage, '', {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }

    }


    return throwError(error);

  }
}
