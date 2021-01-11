import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {ActivatedRoute} from '@angular/router';
import {SuccessHandler} from '../../../share/success-handler';
import {UserService} from '../../services/user.service';
import {RoleService} from '../../services/role.service';
import {Location} from '@angular/common';
import {UserEdit} from '../../models/user-edit';

@Component({
  selector: 'app-edit-own-data',
  templateUrl: './edit-own-data.component.html',
  styleUrls: ['./edit-own-data.component.css']
})
export class EditOwnDataComponent implements OnInit {

  user: User = new User(0, '', false, '', '', '', '');
  userId: number;

  constructor(
    private route: ActivatedRoute,
    private successHandler: SuccessHandler,
    private userService: UserService,
    private roleService: RoleService,
    private location: Location,
    ) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const token = localStorage.getItem('ACCESS_TOKEN');
    this.userId = JSON.parse(atob(token.split('.')[1])).id;
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;
    });
  }

  editUser(): void {
    this.userService.editUser(
      new UserEdit(this.user.name, this.user.lastName, this.user.phoneNumber, this.user.version), this.userId)
      .subscribe(
        res => this.user = res,
        () => {
        },
        () => this.successHandler.notifyUser('change.user.data.page.edit.notification')
      );
  }

  backClicked(): void {
    this.location.back();
  }

}
