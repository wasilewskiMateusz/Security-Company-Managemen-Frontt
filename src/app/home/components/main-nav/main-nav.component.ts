import { Component } from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {Router} from '@angular/router';
import {RoleService} from '../../../user/services/role.service';
import {UserPasswordEditDialogComponent} from '../../../user/user-password-edit/user-password-edit.component';
import {MatDialog} from '@angular/material/dialog';
import {ChangeRoleComponent} from '../change-role/change-role.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {


  constructor(private authService: AuthService,
              private router: Router,
              public roleService: RoleService,
              private dialog: MatDialog) {
  }

  openDialog(): void {
    this.dialog.open(ChangeRoleComponent, {
      width: '350px',
      autoFocus: false
    });
  }

  doLogout(): void {
    this.authService.logout().subscribe(success => {
      if (success) {
        this.router.navigate(['login']);
      }
    });
  }
}
