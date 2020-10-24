import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {ShareModule} from './share/share.module';
import {HomeModule} from './home/home.module';
import {ErrorHandlerService} from './share/error-handler';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    AuthModule,
    ShareModule,
    MatSnackBarModule,
  ],
  providers: [
    ErrorHandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
