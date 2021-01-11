import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserPasswordEdit} from '../../models/user-password-edit';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {SuccessHandler} from '../../../share/success-handler';

@Component({
  selector: 'app-user-password-edit',
  templateUrl: 'user-password-edit.component.html',
  styleUrls: ['./user-password-edit.component.css']

})
export class UserPasswordEditDialogComponent {

  userPasswordEdit: UserPasswordEdit = new UserPasswordEdit('', '', '');
  editedUser: User;

  constructor(
    public dialogRef: MatDialogRef<UserPasswordEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { version: string, id: number },
    private userService: UserService,
    private successHandler: SuccessHandler) {
    this.userPasswordEdit.version = this.data.version;
  }

  changePassword(): void {
    this.userService.changePassword(this.userPasswordEdit, this.data.id)
      .subscribe(
        res => this.editedUser = res,
        () => {
        },
        () => {
          this.successHandler.notifyUser('edit.user.password.page.change.notification');
          this.dialogRef.close();
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
