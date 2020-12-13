import {Component, OnInit} from '@angular/core';
import {JobService} from '../../services/job.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {SuccessHandler} from '../../../share/success-handler';
import {EditJob} from '../../models/edit-job';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {

  editJob: EditJob = new EditJob(null, null, null, '', null, '');
  minDate: Date = new Date();

  constructor(private jobService: JobService,
              private location: Location,
              private router: Router,
              private successHandler: SuccessHandler,
              private route: ActivatedRoute) {
    this.minDate.setDate(this.minDate.getDate() + 1);
  }

  ngOnInit(): void {
    this.getJob();
  }

  private getJob(): void {
    const id = +this.route.snapshot.paramMap.get('jobId');
    this.jobService.getJob(id).subscribe(res => {
      this.editJob = res;
    });
  }

  backClicked(): void {
    this.location.back();
  }

  onSubmit(): void {
    const id = +this.route.snapshot.paramMap.get('jobId');

    this.jobService.editJob(this.editJob, id).subscribe(
      res => this.editJob = res,
      () => {
      },
      () => this.successHandler.notifyUser('Job has been edited')
    );
  }

}
