import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {AuthService} from "../_service/auth.service";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {provideAnimations} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  imports: [
    BsDropdownModule,
    RouterLink,
    RouterLinkActive
  ],
  providers: []
})
export class NavBarComponent {
  constructor(private authService: AuthService) {
  }

  get isAuthenticated(): boolean {

    return this.authService.isLoggedIn;
  }
  logout() {
    this.authService.logout();
  }
}
