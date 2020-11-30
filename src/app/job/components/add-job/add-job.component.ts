import { Component, OnInit } from '@angular/core';
import {CreateWorkplace} from '../../../workplace/models/create-workplace';
import {WorkplaceService} from '../../../workplace/services/workplace.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {SuccessHandler} from '../../../share/success-handler';
import {CreateJob} from '../../models/create-job';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent{

  createJob: CreateJob = new CreateJob(0, new Date(), new Date(), '', 0, 0);
  minDate: Date;
  maxDate: Date;
  time = {hour: 13, minute: 30};
  myDatePicker: Date;


  constructor(private workplaceService: WorkplaceService,
              private location: Location,
              private router: Router,
              private successHandler: SuccessHandler) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  backClicked(): void {
    this.location.back();
  }

  onSubmit(): void {
    //
    // this.workplaceService.createWorkplace(this.createWorkplace).subscribe( next => {
    //   if (next === true) {
    //     this.location.back();
    //     this.successHandler.notifyUser('Workplace has been added');
    //   }
    // });

  }

}
