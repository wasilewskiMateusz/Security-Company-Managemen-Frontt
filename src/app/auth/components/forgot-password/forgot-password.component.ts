import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {SuccessHandler} from '../../../share/success-handler';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent{

  email = '';

  constructor(private authService: AuthService,
              private router: Router,
              private location: Location,
              private successHandler: SuccessHandler) {
  }

  onSubmit(): void {
    this.authService.forgotPassword(this.email).subscribe(next => {
      if (next === true) {
        this.router.navigate(['login']);
        this.successHandler.notifyUser('reset.password.email.notification');
      }
    });

  }

  backClicked(): void {
    this.location.back();
  }

}
