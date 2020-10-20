import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth/components/login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth/guards/auth-guard';
import {HomeGuard} from './auth/guards/home-guard';
import {RegisterComponent} from './auth/components/register/register.component';

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
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
