import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserEdit} from '../../models/user-edit';
import {SuccessHandler} from '../../../share/success-handler';
import {Role} from '../../models/role';
import {RoleService} from '../../services/role.service';
import {Location} from '@angular/common';
import {UserAvailability} from '../../models/user-availability';
import {MatDialog} from '@angular/material/dialog';
import {UserPasswordEditDialogComponent} from '../user-password-edit/user-password-edit.component';
import {UserPasswordEdit} from '../../models/user-password-edit';
import {UserRole} from '../../models/user-role';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User(0, '', false, '', '', '', '');
  userPasswordEdit: UserPasswordEdit = new UserPasswordEdit('', '', '');
  userRolesForm = new FormControl();
  roles: Role[] = [];
  userRolesStringList: string[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private successHandler: SuccessHandler,
    private userService: UserService,
    private roleService: RoleService,
    private location: Location,
    private dialog: MatDialog) {
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
        () => {
        },
        () => this.successHandler.notifyUser('edit.user.data.page.edit.notification')
      );
  }

  changeAvailability(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.userService.changeAvailability(
      new UserAvailability(this.user.enabled, this.user.version), id)
      .subscribe(
        res => this.user = res,
        () => {
        },
        () => {
          this.loading = false;
          this.successHandler.notifyUser('edit.user.data.page.edit.availability.notification');
        }
      );
  }

  backClicked(): void {
    this.location.back();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserPasswordEditDialogComponent, {
      width: '350px',
      data: {
        version: this.user.version, id: +this.route.snapshot.paramMap.get('id')
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.user = result; }
    });
  }

  changeRoles(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    const rolesIds = [];
    this.userRolesForm.value.forEach(roleName => {
        const role = this.roles.find(obj => obj.name === `ROLE_${roleName}`);
        rolesIds.push(role.id);
    });

    this.userService.changeRoles(
      new UserRole(rolesIds, this.user.version), id)
      .subscribe(
        res => this.user = res,
        () => {
        },
        () => this.successHandler.notifyUser('edit.user.data.page.edit.roles.notification')
      );
  }
}
