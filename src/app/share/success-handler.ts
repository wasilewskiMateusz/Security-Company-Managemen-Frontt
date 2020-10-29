import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SuccessHandler {

  constructor(private snackBar: MatSnackBar) {
  }

  public notifyUser(message: string): void {

    this.snackBar.open(message, '', {
      duration: 4000,
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });

  }

}
