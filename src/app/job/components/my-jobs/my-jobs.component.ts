import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {JobService} from '../../services/job.service';
import {ContractService} from '../../services/contract.service';
import {SuccessHandler} from '../../../share/success-handler';
import {Contract} from '../../models/contract';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {

  contracts: Contract[] = [];
  userId: number;

  constructor(private jobService: JobService,
              private router: Router,
              private contractService: ContractService,
              private successHandler: SuccessHandler,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    const token = localStorage.getItem('ACCESS_TOKEN');
    this.userId = JSON.parse(atob(token.split('.')[1])).id;
    this.jobService.getMyContracts(this.userId).subscribe(res => {
      this.contracts = res;
      if (this.contracts.length === 0) {
        this.snackBar.open('You have no jobs', '', {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['warn-snackbar']
        });
      }
    });
  }

  goToWorkplaceDetails(id: number): void {
    this.router.navigate(['home/workplaces', id]);
  }

  resign(id: number): void {
    this.contractService.deleteContract(id).subscribe(next => {
      if (next === true) {
        this.ngOnInit();
        this.successHandler.notifyUser('You have resigned from job');
      }
    });
  }
}
