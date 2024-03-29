import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SCManagement';

  constructor(private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.translate.setDefaultLang('pl');
    const userLang = navigator.language;
    this.translate.use(userLang);
  }
}
