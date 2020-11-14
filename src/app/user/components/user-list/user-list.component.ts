import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['email', 'name', 'surname', 'phoneNumber', 'roles', 'enabled', 'action'];
  users: User[];


  constructor(public userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  goToEdit(id: number): void {
    this.router.navigate(['home/users/user-edit', id]);
  }
}
