import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {SuccessHandler} from '../../../share/success-handler';
import {UserResetPassword} from '../../models/user-reset-password';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  userResetPassword: UserResetPassword = new UserResetPassword('', '', '');

  constructor(private authService: AuthService,
              private router: Router,
              private location: Location,
              private successHandler: SuccessHandler,
              private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userResetPassword.token = params.token;
    });
  }

  onSubmit(): void {
    this.authService.resetPassword(this.userResetPassword).subscribe(next => {
      if (next === true) {
        this.router.navigate(['login']);
        this.successHandler.notifyUser('');
      }
    });

  }


}
