import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../user/services/user.service';
import {Router} from '@angular/router';
import {Workplace} from '../../models/workplace';

@Component({
  selector: 'app-my-workplaces',
  templateUrl: './my-workplaces.component.html',
  styleUrls: ['./my-workplaces.component.css']
})
export class MyWorkplacesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'street', 'city', 'averageRate', 'enabled', 'action'];
  workplaces: Workplace[];
  userId: number;


  constructor(public userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem('ACCESS_TOKEN');
    this.userId = JSON.parse(atob(token.split('.')[1])).id;
    this.loadWorkplaces();
  }

  loadWorkplaces(): void {
    this.userService.getUserWorkplaces(this.userId).subscribe(res => {
      this.workplaces = res;
    });
  }

  goToEdit(id: number): void {
    this.router.navigate(['home/my-workplaces/workplace-edit', id]);
  }

}
