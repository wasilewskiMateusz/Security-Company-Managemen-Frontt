import { Component, OnInit } from '@angular/core';
import {RoleService} from '../user/services/role.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
    this.roleService.loadRoles();
  }

}
