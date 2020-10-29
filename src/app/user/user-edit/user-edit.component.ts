import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth/services/auth.service';
import {UserEdit} from '../models/user-edit';
import {SuccessHandler} from '../../share/success-handler';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User(0, '', false, '', '', '', '');

  constructor(
    private route: ActivatedRoute,
    private successHandler: SuccessHandler,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(res => {
      this.user = res;
    });
  }

  editUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.editUser(
      new UserEdit(this.user.name, this.user.lastName, this.user.phoneNumber, this.user.version), id)
      .subscribe(
        res => this.user = res,
        () => {},
        () => this.successHandler.notifyUser('User has been changed')
        );
  }
}
