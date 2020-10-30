import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth/services/auth.service';
import {UserEdit} from '../models/user-edit';
import {SuccessHandler} from '../../share/success-handler';
import {Role} from '../models/role';
import {RoleService} from '../services/role.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User(0, '', false, '', '', '', '');
  userRoles = new FormControl();
  roles: Role[] = [];
  userRolesStringList: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private successHandler: SuccessHandler,
    private userService: UserService,
    private roleService: RoleService) {
  }

  ngOnInit(): void {
    //this.userRoles.setValue()
    this.getUser();
    this.loadRoles();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(res => {
      this.user = res;
    });
  }

  loadRoles(): void {
    this.roleService.getRoles().subscribe(res => {
      this.roles = res;
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
