import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './components/job-list/job-list.component';
import {ShareModule} from '../share/share.module';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';
import { JobEmployeesComponent } from './components/job-employees/job-employees.component';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [JobListComponent, MyJobsComponent, JobEmployeesComponent],
  imports: [
    CommonModule,
    ShareModule,
    MatTableModule,
  ]
})
export class JobModule { }
