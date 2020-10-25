import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {MainNavComponent} from './main-nav/main-nav.component';
import {ShareModule} from '../share/share.module';
import {UserModule} from '../user/user.module';



@NgModule({
  declarations: [
    HomeComponent,
    MainNavComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    UserModule
  ]
})
export class HomeModule { }
