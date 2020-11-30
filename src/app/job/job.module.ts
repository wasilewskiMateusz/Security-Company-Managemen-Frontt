import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JobListComponent} from './components/job-list/job-list.component';
import {ShareModule} from '../share/share.module';
import {MyJobsComponent} from './components/my-jobs/my-jobs.component';
import {JobEmployeesComponent} from './components/job-employees/job-employees.component';
import {MatTableModule} from '@angular/material/table';
import {AddJobComponent} from './components/add-job/add-job.component';


@NgModule({
  declarations: [JobListComponent, MyJobsComponent, JobEmployeesComponent, AddJobComponent],
  imports: [
    CommonModule,
    ShareModule,
    MatTableModule,
  ]
})
export class JobModule {
}
