import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {WorkplaceService} from '../../services/workplace.service';
import {SuccessHandler} from '../../../share/success-handler';
import {ActivatedRoute} from '@angular/router';
import {Workplace} from '../../models/workplace';
import {Job} from '../../../job/models/job';
import {CreateContract} from '../../../job/models/create-contract';
import {ContractService} from '../../../job/services/contract.service';
import {MatDialog} from '@angular/material/dialog';
import {RateWorkplaceComponent} from '../rate-workplace/rate-workplace.component';

@Component({
  selector: 'app-workplace-details',
  templateUrl: './workplace-details.component.html',
  styleUrls: ['./workplace-details.component.css']
})
export class WorkplaceDetailsComponent implements OnInit {

  workplace: Workplace = new Workplace(0, '', '', '', '', false, 0, '', '', '');
  jobs: Job[] = [];
  displayedColumns: string[] = ['startDate', 'completionDate', 'wage', 'vacancy', 'action'];
  @ViewChild('rateButton') private rateButton: ElementRef;


  constructor(private location: Location,
              private workplaceService: WorkplaceService,
              private successHandler: SuccessHandler,
              private route: ActivatedRoute,
              private contractService: ContractService,
              private dialog: MatDialog) { }

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

  openDialog(): void {
    const dialogRef = this.dialog.open(RateWorkplaceComponent, {
      width: '350px',
      restoreFocus: false,
      data: {
        id: this.workplace.id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}
