import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './components/job-list/job-list.component';
import {ShareModule} from '../share/share.module';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';



@NgModule({
  declarations: [JobListComponent, MyJobsComponent],
  imports: [
    CommonModule,
    ShareModule,
  ]
})
export class JobModule { }
