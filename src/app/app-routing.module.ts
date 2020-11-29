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
import {EditOwnPasswordComponent} from './user/components/edit-own-password/edit-own-password.component';
import {MyWorkplacesComponent} from './workplace/components/my-workplaces/my-workplaces.component';
import {AddWorkplaceComponent} from './workplace/components/add-workplace/add-workplace.component';
import {EditWorkplaceComponent} from './workplace/components/edit-workplace/edit-workplace.component';
import {WorkplacesListComponent} from './workplace/components/workplaces-list/workplaces-list.component';
import {WorkplaceDetailsComponent} from './workplace/components/workplace-details/workplace-details.component';
import {JobListComponent} from './job/components/job-list/job-list.component';
import {MyJobsComponent} from './job/components/my-jobs/my-jobs.component';
import {JobEmployeesComponent} from './job/components/job-employees/job-employees.component';

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
      {path: 'edit-own-data', component: EditOwnDataComponent},
      {path: 'edit-own-password', component: EditOwnPasswordComponent},
      {path: 'workplaces', component: WorkplacesListComponent},
      {path: 'workplaces/:id', component: WorkplaceDetailsComponent},
      {path: 'workplaces/:id/jobs/:jobId/employees', component: JobEmployeesComponent},
      {path: 'my-workplaces', component: MyWorkplacesComponent},
      {path: 'my-workplaces/add-workplace', component: AddWorkplaceComponent},
      {path: 'my-workplaces/edit-workplace/:id', component: EditWorkplaceComponent},
      {path: 'jobs', component: JobListComponent},
      {path: 'my-jobs', component: MyJobsComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
