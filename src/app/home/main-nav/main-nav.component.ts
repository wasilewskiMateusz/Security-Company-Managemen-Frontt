import { Component } from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {


  constructor(private authService: AuthService, private router: Router) {
  }

  doLogout(): void {
    this.authService.logout().subscribe(success => {
      if (success) {
        this.router.navigate(['login']);
      }
    });
  }
}
