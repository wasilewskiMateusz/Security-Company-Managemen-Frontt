import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import {UserService} from './services/user.service';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  providers: [
    UserService,
  ],
  declarations: [
    UserListComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
  ],
  exports: [
  ]
})
export class UserModule { }
