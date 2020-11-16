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

  constructor(private workplaceService: WorkplaceService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadWorkplaces();
  }

  loadWorkplaces(): void {
    this.workplaceService.getWorkplaces().subscribe( res => {
      res.forEach(workplace => {
        if (workplace.enabled === true) { this.workplaces.push(workplace); }
      });
    });
  }

  goToDetails(id: number): void {
    this.router.navigate(['home/workplaces', id]);
  }

}
