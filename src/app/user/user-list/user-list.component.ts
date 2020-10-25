import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['email', 'name', 'surname', 'enabled', 'details'];
  users: User[];



  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
   this.userService.getUsers().subscribe(res => {
      this.users = res;
    });
  }
}
