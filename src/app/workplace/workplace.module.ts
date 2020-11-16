import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyWorkplacesComponent } from './components/my-workplaces/my-workplaces.component';
import {ShareModule} from '../share/share.module';
import {MatTableModule} from '@angular/material/table';
import {WorkplaceService} from './services/workplace.service';
import { AddWorkplaceComponent } from './components/add-workplace/add-workplace.component';



@NgModule({
  providers: [
    WorkplaceService
  ],
  declarations: [MyWorkplacesComponent, AddWorkplaceComponent],
  imports: [
    CommonModule,
    MatTableModule,
    ShareModule
  ]
})
export class WorkplaceModule { }
