import { Component, OnInit } from '@angular/core';
import {EditWorkplace} from '../../models/edit-workplace';
import {Location} from '@angular/common';
import {WorkplaceService} from '../../services/workplace.service';
import {SuccessHandler} from '../../../share/success-handler';
import {ActivatedRoute, Router} from '@angular/router';
import {Workplace} from '../../models/workplace';


@Component({
  selector: 'app-edit-workplace',
  templateUrl: './edit-workplace.component.html',
  styleUrls: ['./edit-workplace.component.css']
})
export class EditWorkplaceComponent implements OnInit {

  editWorkplace: EditWorkplace = new EditWorkplace('', '', '', '', '');

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
      this.editWorkplace = res;
    });
  }

  backClicked(): void {
    this.location.back();
  }

  onSubmit(): void {

    const id = +this.route.snapshot.paramMap.get('id');

    this.workplaceService.editWorkplace(this.editWorkplace, id).subscribe(
      res => this.editWorkplace = res,
      () => {
      },
      () => this.successHandler.notifyUser('Workplace has been edited')
    );
  }

}
