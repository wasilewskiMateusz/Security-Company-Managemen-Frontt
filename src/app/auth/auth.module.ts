import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {ShareModule} from '../share/share.module';
import {AuthService} from './services/auth.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './token-interceptor';
import {RegisterComponent} from './components/register/register.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';


@NgModule({
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
  ]
})
export class AuthModule {
}
