import { Component, OnInit } from '@angular/core';
import {Workplace} from '../../models/workplace';
import {UserService} from '../../../user/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkplaceService} from '../../services/workplace.service';

@Component({
  selector: 'app-user-workplaces',
  templateUrl: './user-workplaces.component.html',
  styleUrls: ['./user-workplaces.component.css']
})
export class UserWorkplacesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'street', 'city', 'averageRate', 'enabled', 'action'];
  workplaces: Workplace[] = [];
  userId: number;


  constructor(public userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private workplaceService: WorkplaceService) {
  }

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.loadWorkplaces();
  }

  loadWorkplaces(): void {
    this.userService.getUserWorkplaces(this.userId).subscribe(res => {
      this.workplaces = res.filter(workplace => workplace.enabled);
    });
  }

  goToEdit(id: number): void {
    this.router.navigate(['home/workplaces/edit-workplace', id]);
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
