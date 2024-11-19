import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor (public router: Router, public sharedService: SharedService) {}
  public goToHome() {
    this.router.navigate(['/']);
  }
}
