import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User(0, '', false, '', '', '');

  constructor(
    private route: ActivatedRoute,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(res => {
        this.user = res;
      });
  }
}
