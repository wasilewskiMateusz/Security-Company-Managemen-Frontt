import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import {UserService} from './services/user.service';
import {MatTableModule} from '@angular/material/table';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import {ShareModule} from '../share/share.module';
import {RoleService} from './services/role.service';
import {UserPasswordEditDialogComponent} from './components/user-password-edit/user-password-edit.component';
import { EditOwnDataComponent } from './components/edit-own-data/edit-own-data.component';
import { EditOwnPasswordComponent } from './components/edit-own-password/edit-own-password.component';



@NgModule({
  providers: [
    UserService,
    RoleService,
  ],
  declarations: [
    UserListComponent,
    UserEditComponent,
    UserPasswordEditDialogComponent,
    EditOwnDataComponent,
    EditOwnPasswordComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    ShareModule,

  ],
  exports: [
    UserEditComponent
  ]
})
export class UserModule { }
