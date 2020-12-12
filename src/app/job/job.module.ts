import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {JobListComponent} from './components/job-list/job-list.component';
import {ShareModule} from '../share/share.module';
import {MyJobsComponent} from './components/my-jobs/my-jobs.component';
import {JobEmployeesComponent} from './components/job-employees/job-employees.component';
import {MatTableModule} from '@angular/material/table';
import {AddJobComponent} from './components/add-job/add-job.component';
import {NGX_MAT_DATE_FORMATS, NgxMatDateAdapter, NgxMatDateFormats} from '@angular-material-components/datetime-picker';
import {NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS, NgxMatMomentAdapter} from '@angular-material-components/moment-adapter';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import { CustomMinDirective } from './util/custom-min.directive';


const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'l, LTS'
  },
  display: {
    dateInput: 'DD-MM-YYYY HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@NgModule({
  declarations: [
    JobListComponent,
    MyJobsComponent,
    JobEmployeesComponent,
    AddJobComponent,
    CustomMinDirective],
  imports: [
    CommonModule,
    ShareModule,
    MatTableModule,
  ],
  providers: [
    {
      provide: NgxMatDateAdapter,
      useClass: NgxMatMomentAdapter,
      deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ],
})
export class JobModule {
}
