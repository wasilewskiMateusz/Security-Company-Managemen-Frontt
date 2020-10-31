import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../models/user';
import {FormControl} from '@angular/forms';
import {UserEdit} from '../models/user-edit';
import {SuccessHandler} from '../../share/success-handler';
import {Role} from '../models/role';
import {RoleService} from '../services/role.service';
import { Location } from '@angular/common';
import {UserAvailability} from '../models/user-availability';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User(0, '', false, '', '', '', '');
  userRolesForm = new FormControl();
  roles: Role[] = [];
  userRolesStringList: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private successHandler: SuccessHandler,
    private userService: UserService,
    private roleService: RoleService,
    private location: Location) {
  }

  ngOnInit(): void {
    this.getUser();
    this.loadRoles();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(res => {
      this.user = res;
      this.getUserCurrentRoles();
    });
  }

  loadRoles(): void {
    this.roleService.getRoles().subscribe(res => {
      this.roles = res;
    });
  }

  getUserCurrentRoles(): void {
    this.user.roles.forEach(role => this.userRolesStringList.push(role.name.substring(5)));
    this.userRolesForm.setValue(this.userRolesStringList);
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

  changeAvailability(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.changeAvailability(
      new UserAvailability(this.user.enabled, this.user.version), id)
      .subscribe(
        res => this.user = res,
        () => {},
        () => this.successHandler.notifyUser('User availability has been changed')
      );
  }

  backClicked(): void {
    this.location.back();
  }
}
