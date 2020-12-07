import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../user/services/user.service';
import {Router} from '@angular/router';
import {Workplace} from '../../models/workplace';
import {WorkplaceService} from '../../services/workplace.service';

@Component({
  selector: 'app-my-workplaces',
  templateUrl: './my-workplaces.component.html',
  styleUrls: ['./my-workplaces.component.css']
})
export class MyWorkplacesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'street', 'city', 'averageRate', 'enabled', 'action'];
  workplaces: Workplace[] = [];
  userId: number;


  constructor(public userService: UserService,
              private router: Router,
              private workplaceService: WorkplaceService) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem('ACCESS_TOKEN');
    this.userId = JSON.parse(atob(token.split('.')[1])).id;
    this.loadWorkplaces();
  }

  loadWorkplaces(): void {
    this.userService.getUserWorkplaces(this.userId).subscribe(res => {
      this.workplaces = res.filter(workplace => workplace.enabled);
    });
  }

  goToEdit(id: number): void {
    this.router.navigate(['home/my-workplaces/edit-workplace', id]);
  }

  goToDetails(id: number): void {
    this.router.navigate(['home/workplaces/', id]);
  }

  delete(id: number, version: string): void {
    this.workplaceService.disableWorkplace(id, version).subscribe(
      next => this.ngOnInit()
    );
  }
}
