import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {MainNavComponent} from './main-nav/main-nav.component';
import {ShareModule} from '../share/share.module';



@NgModule({
  declarations: [
    HomeComponent,
    MainNavComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
  ]
})
export class HomeModule { }
