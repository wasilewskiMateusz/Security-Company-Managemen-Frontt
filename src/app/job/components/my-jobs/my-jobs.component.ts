import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {JobService} from '../../services/job.service';
import {ContractService} from '../../services/contract.service';
import {SuccessHandler} from '../../../share/success-handler';
import {Contract} from '../../models/contract';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {

  contracts: Contract[] = [];
  userId: number;
  selectedStatus = '';
  filteredContracts: Contract[] = [];
  allStatus: string[] = ['Claimed', 'Started', 'Finished'];


  constructor(private jobService: JobService,
              private router: Router,
              private contractService: ContractService,
              private successHandler: SuccessHandler,
              private snackBar: MatSnackBar,
              private translate: TranslatePipe) {
  }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    const token = localStorage.getItem('ACCESS_TOKEN');
    this.userId = JSON.parse(atob(token.split('.')[1])).id;
    this.jobService.getMyContracts(this.userId).subscribe(res => {
      this.contracts = res;
      this.filteredContracts = this.contracts;
      if (this.contracts.length === 0) {
        this.snackBar.open(this.translate.transform('my.jobs.no.jobs.notification') , '', {
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
        this.successHandler.notifyUser('my.jobs.resign.notification');
      }
    });
  }

  checkIn(id: number, version: string): void {
    this.contractService.checkInContract(id, version).subscribe(
      () => {
        this.ngOnInit();
      },
    );
  }

  filterStatus(): void {
    this.filteredContracts = this.contracts.filter(contract => this.matchStatus(this.selectedStatus, contract));
  }

  matchStatus(status: string, contract: Contract): boolean {
    if (status === undefined) { return false; }
    if (status === contract.status) { return true; }
    return false;
  }
}
