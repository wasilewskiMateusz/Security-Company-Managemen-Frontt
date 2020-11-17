import { Component, OnInit } from '@angular/core';
import {EditWorkplace} from '../../models/edit-workplace';
import {Location} from '@angular/common';
import {WorkplaceService} from '../../services/workplace.service';
import {SuccessHandler} from '../../../share/success-handler';
import {ActivatedRoute} from '@angular/router';
import {Workplace} from '../../models/workplace';

@Component({
  selector: 'app-workplace-details',
  templateUrl: './workplace-details.component.html',
  styleUrls: ['./workplace-details.component.css']
})
export class WorkplaceDetailsComponent implements OnInit {

  workplace: Workplace = new Workplace(0, '', '', '', '', false, 0, '', '', '');

  constructor(private location: Location,
              private workplaceService: WorkplaceService,
              private successHandler: SuccessHandler,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getWorkplace();
  }

  getWorkplace(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.workplaceService.getWorkplace(id).subscribe(res => {
      this.workplace = res;
    });
  }

  backClicked(): void {
    this.location.back();
  }

}
