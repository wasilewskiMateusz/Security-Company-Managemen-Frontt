import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './components/job-list/job-list.component';
import {ShareModule} from '../share/share.module';



@NgModule({
  declarations: [JobListComponent],
  imports: [
    CommonModule,
    ShareModule,
  ]
})
export class JobModule { }
