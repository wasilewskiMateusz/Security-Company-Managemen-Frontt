import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {ShareModule} from '../share/share.module';
import {AuthService} from './services/auth.service';



@NgModule({
  providers: [
    AuthService
  ],
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
  ]
})
export class AuthModule { }
