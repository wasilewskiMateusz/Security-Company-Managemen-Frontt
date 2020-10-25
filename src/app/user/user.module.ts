import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import {UserService} from './services/user.service';
import {MatTableModule} from '@angular/material/table';
import { UserEditComponent } from './user-edit/user-edit.component';



@NgModule({
  providers: [
    UserService,
  ],
  declarations: [
    UserListComponent,
    UserEditComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
  ],
  exports: [
  ]
})
export class UserModule { }
