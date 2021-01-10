import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {UserRegister} from '../../models/user-register';
import {Location} from '@angular/common';
import {SuccessHandler} from '../../../share/success-handler';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  userRegister: UserRegister = new UserRegister('', '', '', '', '', '');
  loading = false;

  constructor(private authService: AuthService,
              private router: Router,
              private location: Location,
              private successHandler: SuccessHandler) {
  }

  ngOnInit(): void {
  }

  backClicked(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.loading = true;
    this.authService.register(this.userRegister).subscribe(next => {
      if (next === true) {
        this.router.navigate(['login']);
        this.loading = false;
        this.successHandler.notifyUser('register.page.email.notification');
      }
    });

  }

}
