import { Component, OnInit } from '@angular/core';
import {EditWorkplace} from '../../models/edit-workplace';
import {Location} from '@angular/common';
import {WorkplaceService} from '../../services/workplace.service';
import {SuccessHandler} from '../../../share/success-handler';
import {ActivatedRoute} from '@angular/router';
import {Workplace} from '../../models/workplace';
import {Job} from '../../../job/models/job';
import {CreateContract} from '../../../job/models/create-contract';
import {ContractService} from '../../../job/services/contract.service';

@Component({
  selector: 'app-workplace-details',
  templateUrl: './workplace-details.component.html',
  styleUrls: ['./workplace-details.component.css']
})
export class WorkplaceDetailsComponent implements OnInit {

  workplace: Workplace = new Workplace(0, '', '', '', '', false, 0, '', '', '');
  jobs: Job[] = [];
  displayedColumns: string[] = ['startDate', 'completionDate', 'wage', 'vacancy', 'action'];

  constructor(private location: Location,
              private workplaceService: WorkplaceService,
              private successHandler: SuccessHandler,
              private route: ActivatedRoute,
              private contractService: ContractService) { }

  ngOnInit(): void {
    this.getWorkplace();
    this.getJobsInWorkplace();
  }

  getWorkplace(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.workplaceService.getWorkplace(id).subscribe(res => {
      this.workplace = res;
    });
  }

  getJobsInWorkplace(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.workplaceService.getJobsInWorkplace(id).subscribe(res => {
      this.jobs = res;
    });
}

  backClicked(): void {
    this.location.back();
  }

  signUpToJob(id: number): void {
    this.contractService.createContract(new CreateContract(id)).subscribe(next => {
      if (next === true) {
        this.ngOnInit();
        this.successHandler.notifyUser('You have been signed up to job');
      }
    });
  }

}
