import { Component, OnInit } from '@angular/core';
import {User} from '../../../user/models/user';
import {UserService} from '../../../user/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {JobService} from '../../services/job.service';
import {ContractService} from '../../services/contract.service';
import {SuccessHandler} from '../../../share/success-handler';
import {Contract} from '../../models/contract';

@Component({
  selector: 'app-job-employees',
  templateUrl: './job-employees.component.html',
  styleUrls: ['./job-employees.component.css']
})
export class JobEmployeesComponent implements OnInit {

  displayedColumns: string[] = ['email', 'name', 'surname', 'phoneNumber', 'action'];
  contracts: Contract[];


  constructor(public jobService: JobService,
              private router: Router,
              private route: ActivatedRoute,
              private contractService: ContractService,
              private successHandler: SuccessHandler) {
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    const id = +this.route.snapshot.paramMap.get('jobId');
    this.jobService.getJobContracts(id).subscribe(res => {
      this.contracts = res;
    });
  }

  fire(id: number, name: string, lastName: string): void {
    this.contractService.deleteContract(id).subscribe(next => {
      if (next === true) {
        this.ngOnInit();
        this.successHandler.notifyUser(`You have fired ${name} ${lastName}`);
      }
    });
  }

}
