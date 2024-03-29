import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyWorkplacesComponent} from './components/my-workplaces/my-workplaces.component';
import {ShareModule} from '../share/share.module';
import {MatTableModule} from '@angular/material/table';
import {WorkplaceService} from './services/workplace.service';
import {AddWorkplaceComponent} from './components/add-workplace/add-workplace.component';
import {EditWorkplaceComponent} from './components/edit-workplace/edit-workplace.component';
import {WorkplacesListComponent} from './components/workplaces-list/workplaces-list.component';
import {WorkplaceDetailsComponent} from './components/workplace-details/workplace-details.component';
import {RateWorkplaceComponent} from './components/rate-workplace/rate-workplace.component';
import { UserWorkplacesComponent } from './components/user-workplaces/user-workplaces.component';


@NgModule({
  providers: [
    WorkplaceService,
  ],
  declarations: [
    MyWorkplacesComponent,
    AddWorkplaceComponent,
    EditWorkplaceComponent,
    WorkplacesListComponent,
    WorkplaceDetailsComponent,
    RateWorkplaceComponent,
    UserWorkplacesComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    ShareModule,
  ]
})
export class WorkplaceModule {
}
