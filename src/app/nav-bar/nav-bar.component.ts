import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {AuthService} from "../_service/auth.service";

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss',
    imports: [
        RouterLink,
        RouterLinkActive
    ],
    providers: []
})
export class NavBarComponent {
  protected isAdmin = false;
  constructor(protected authService: AuthService) {
    this.isAdmin = this.authService.isAdmin();
  }

  get isAuthenticated(): boolean {

    return this.authService.isLoggedIn;
  }
  logout() {
    this.authService.logout();
  }
}
