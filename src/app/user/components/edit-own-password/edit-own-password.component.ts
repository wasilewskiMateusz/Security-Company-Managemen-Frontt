import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Location} from '@angular/common';
import {UserOwnPasswordEdit} from '../../models/user-own-password-edit';
import {SuccessHandler} from '../../../share/success-handler';


@Component({
  selector: 'app-edit-own-password',
  templateUrl: './edit-own-password.component.html',
  styleUrls: ['./edit-own-password.component.css']
})
export class EditOwnPasswordComponent implements OnInit {

  userOwnPasswordEdit: UserOwnPasswordEdit = new UserOwnPasswordEdit('', '', '', '');
  userId: number;

  constructor(private userService: UserService,
              private location: Location,
              private successHandler: SuccessHandler) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const token = localStorage.getItem('ACCESS_TOKEN');
    this.userId = JSON.parse(atob(token.split('.')[1])).id;
    this.userService.getUser(this.userId).subscribe(res => {
      this.userOwnPasswordEdit.version = res.version;
    });
  }

  backClicked(): void {
    this.location.back();
  }

  onSubmit(): void {

    this.userService.changeOwnPassword(this.userOwnPasswordEdit, this.userId)
      .subscribe(
        () => {
        },
        () => {
        },
        () => {
          this.successHandler.notifyUser('User password has been changed');
        }
      );

  }
}
