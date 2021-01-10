import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslatePipe} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SuccessHandler {

  constructor(private snackBar: MatSnackBar,
              private translate: TranslatePipe) {
  }

  public notifyUser(message: string): void {

    this.snackBar.open(this.translate.transform(message), '', {
      duration: 4000,
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });

  }

}
