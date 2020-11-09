import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth/components/login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth/guards/auth-guard';
import {HomeGuard} from './auth/guards/home-guard';
import {RegisterComponent} from './auth/components/register/register.component';
import {UserListComponent} from './user/components/user-list/user-list.component';
import {UserEditComponent} from './user/components/user-edit/user-edit.component';
import {EditOwnDataComponent} from './user/components/edit-own-data/edit-own-data.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home', component: HomeComponent, canActivate: [HomeGuard],
    children: [
      {path: 'users', component: UserListComponent},
      {path: 'users/user-edit/:id', component: UserEditComponent},
      {path: 'edit-own-data', component: EditOwnDataComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
