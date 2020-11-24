import {Component, Inject, OnInit} from '@angular/core';
import {UserPasswordEdit} from '../../../user/models/user-password-edit';
import {User} from '../../../user/models/user';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../../user/services/user.service';
import {SuccessHandler} from '../../../share/success-handler';
import {RateWorkplace} from '../../models/rate-workplace';
import {RateService} from '../../services/rate.service';

@Component({
  selector: 'app-rate-workplace',
  templateUrl: './rate-workplace.component.html',
  styleUrls: ['./rate-workplace.component.css']
})
export class RateWorkplaceComponent {

  ratedWorkplace: RateWorkplace = new RateWorkplace(0, 0);

  constructor(
    public dialogRef: MatDialogRef<RateWorkplaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private rateService: RateService,
    private successHandler: SuccessHandler) {
    this.ratedWorkplace.workplaceId = data.id;
  }

  rate(): void {
    this.rateService.rate(this.ratedWorkplace)
      .subscribe(
        res => {
          if (res === true) {
            this.successHandler.notifyUser('Workplace has been rated');
            this.dialogRef.close();
          }
        });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
