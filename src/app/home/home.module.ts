import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {MainNavComponent} from './components/main-nav/main-nav.component';
import {ShareModule} from '../share/share.module';
import {UserModule} from '../user/user.module';
import { ChangeRoleComponent } from './components/change-role/change-role.component';
import {WorkplaceModule} from '../workplace/workplace.module';
import {JobModule} from '../job/job.module';



@NgModule({
  declarations: [
    HomeComponent,
    MainNavComponent,
    ChangeRoleComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    UserModule,
    WorkplaceModule,
    JobModule,
  ]
})
export class HomeModule { }
