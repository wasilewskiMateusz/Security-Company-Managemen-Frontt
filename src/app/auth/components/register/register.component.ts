import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeatedPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8)]),
      firstName: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]{1,32}')]),
      lastName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.pattern('[0-9]{3} [0-9]{3} [0-9]{3}')]),
    });
  }

  getEmailErrorMessage(): string {
    if (this.registerForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.registerForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage(): string {
    if (this.registerForm.controls.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.registerForm.controls.password.hasError('minlength') ? 'Password should contain 8 characters' : '';
  }
  getRepeatedPasswordErrorMessage(): string {
    if (this.registerForm.controls.repeatedPassword.hasError('required')) {
      return 'You must enter a value';
    }
    return this.registerForm.controls.repeatedPassword.hasError('minlength') ? 'Password should contain 8 characters' : '';
  }

  getFirstNameErrorMessage(): string {
    if (this.registerForm.controls.firstName.hasError('required')) {
      return 'You must enter a value';
    }
    return this.registerForm.controls.firstName.hasError('pattern') ? 'FirstName should start with capital letter' : '';
  }

  getLastNameErrorMessage(): string {
    if (this.registerForm.controls.lastName.hasError('required')) {
      return 'You must enter a value';
    }
    return this.registerForm.controls.lastName.hasError('pattern') ? 'FirstName should start with capital letter' : '';
  }

  getPhoneNumberErrorMessage(): string {
    if (this.registerForm.controls.phoneNumber.hasError('required')) {
      return 'You must enter a value';
    }
    return this.registerForm.controls.phoneNumber.hasError('pattern') ? '000 000 000' : '';
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const email = this.registerForm.get('email').value;
      const password = this.registerForm.get('password').value;
      const rePassword = this.registerForm.get('repeatedPassword').value;
      const firstName = this.registerForm.get('firstName').value;
      const lastName = this.registerForm.get('lastName').value;
      const phoneNumber = this.registerForm.get('phoneNumber').value.split(' ').join('');

      this.authService.register(
        {
          email,
          password,
          rePassword,
          firstName,
          lastName,
          phoneNumber
        }
      ).subscribe( next => {
        if (next === true) {
        this.router.navigate(['login']);
        }
      });

    }
  }


}
