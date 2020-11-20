import { Component, OnInit } from '@angular/core';
import {Workplace} from '../../../workplace/models/workplace';
import {WorkplaceService} from '../../../workplace/services/workplace.service';
import {Router} from '@angular/router';
import {Job} from '../../models/job';
import {JobService} from '../../services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobs: Job[] = [];

  constructor(private jobService: JobService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getJobs().subscribe( res => {
      res.forEach(job => {
        if (job.enabled === true) { this.jobs.push(job); }
      });
    });
  }

  goToWorkplaceDetails(id: number): void {
    this.router.navigate(['home/workplaces', id]);
  }

}
