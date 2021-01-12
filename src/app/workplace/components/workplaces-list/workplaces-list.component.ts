import { Component, OnInit } from '@angular/core';
import {WorkplaceService} from '../../services/workplace.service';
import {Workplace} from '../../models/workplace';
import {Router} from '@angular/router';

@Component({
  selector: 'app-workplaces-list',
  templateUrl: './workplaces-list.component.html',
  styleUrls: ['./workplaces-list.component.css']
})
export class WorkplacesListComponent implements OnInit {

  workplaces: Workplace[] = [];
  maxRate = 5;

  constructor(private workplaceService: WorkplaceService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadWorkplaces();
  }

  loadWorkplaces(): void {
    this.workplaceService.getWorkplaces().subscribe(
      res => this.workplaces = res.filter(workplace => workplace.enabled));
  }

  goToDetails(id: number): void {
    this.router.navigate(['home/workplaces', id]);
  }

}
