import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import {UserService} from './services/user.service';
import {MatTableModule} from '@angular/material/table';
import { UserEditComponent } from './user-edit/user-edit.component';
import {ShareModule} from '../share/share.module';
import {FormsModule} from '@angular/forms';



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
    ShareModule,

  ],
  exports: [
    UserEditComponent
  ]
})
export class UserModule { }
