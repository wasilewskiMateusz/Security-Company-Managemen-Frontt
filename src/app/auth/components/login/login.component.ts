import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  getEmailErrorMessage(): string {
    if (this.loginForm.controls.email.hasError('required')) {
      return 'form.error.required';
    }

    return this.loginForm.controls.email.hasError('email') ? 'form.error.email' : '';
  }

  getPasswordErrorMessage(): string {
    if (this.loginForm.controls.password.hasError('required')) {
      return 'form.error.required';
    }
    return this.loginForm.controls.password.hasError('minlength') ? 'form.error.password.length' : '';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;

      this.authService.login(
        {
          email,
          password
        }
      ).subscribe(
        next => {
          this.router.navigate(['home']);
        });
    }
  }

}
