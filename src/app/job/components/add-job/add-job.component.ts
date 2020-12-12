import {Component} from '@angular/core';
import {DatePipe, Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {SuccessHandler} from '../../../share/success-handler';
import {CreateJob} from '../../models/create-job';
import {JobService} from '../../services/job.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent{

  createJob: CreateJob = new CreateJob(null, null, null, '', null, 0);
  minDate: Date = new Date();

  constructor(private jobService: JobService,
              private location: Location,
              private router: Router,
              private successHandler: SuccessHandler,
              private route: ActivatedRoute) {
    this.createJob.workplaceId = +this.route.snapshot.paramMap.get('id');
    this.minDate.setDate(this.minDate.getDate() + 1);
  }

  backClicked(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.jobService.createJob(this.createJob).subscribe( next => {
      if (next === true) {
        this.location.back();
        this.successHandler.notifyUser('Job has been added');
      }
    });

  }

}
