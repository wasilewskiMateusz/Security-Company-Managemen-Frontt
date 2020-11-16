import { Component, OnInit } from '@angular/core';
import {CreateWorkplace} from '../../models/create-workplace';
import {WorkplaceService} from '../../services/workplace.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {SuccessHandler} from '../../../share/success-handler';


@Component({
  selector: 'app-add-workplace',
  templateUrl: './add-workplace.component.html',
  styleUrls: ['./add-workplace.component.css']
})
export class AddWorkplaceComponent {

  createWorkplace: CreateWorkplace = new CreateWorkplace('', '', '', '');

  constructor(private workplaceService: WorkplaceService,
              private location: Location,
              private router: Router,
              private successHandler: SuccessHandler) { }

  backClicked(): void {
    this.location.back();
  }

  onSubmit(): void {

    this.workplaceService.createWorkplace(this.createWorkplace).subscribe( next => {
      if (next === true) {
        this.location.back();
        this.successHandler.notifyUser('Workplace has been added');
      }
    });

  }

}
