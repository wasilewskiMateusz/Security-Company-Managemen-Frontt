import {Component, OnInit} from '@angular/core';
import {Workplace} from '../../../workplace/models/workplace';
import {WorkplaceService} from '../../../workplace/services/workplace.service';
import {Router} from '@angular/router';
import {Job} from '../../models/job';
import {JobService} from '../../services/job.service';
import {ContractService} from '../../services/contract.service';
import {CreateContract} from '../../models/create-contract';
import {SuccessHandler} from '../../../share/success-handler';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobs: Job[] = [];

  constructor(private jobService: JobService,
              private router: Router,
              private contractService: ContractService,
              private successHandler: SuccessHandler) {
  }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getJobs().subscribe(res => this.jobs = res.filter(job => job.enabled));
  }

  goToWorkplaceDetails(id: number): void {
    this.router.navigate(['home/workplaces', id]);
  }

  signUpToJob(id: number): void {
    this.contractService.createContract(new CreateContract(id)).subscribe(next => {
      if (next === true) {
        this.ngOnInit();
        this.successHandler.notifyUser('job.list.page.sign.up.notification');
      }
    });
  }
}
