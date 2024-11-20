import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {Title} from "@angular/platform-browser";
import {FooterComponent} from "./footer/footer.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavBarComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Lil Gallery';
  constructor(private titleS:Title) {
    this.titleS.setTitle(this.title);
    this.setBlackTheme();
  }
  setBlackTheme(){
    document.body.setAttribute('data-bs-theme', 'dark');
  }
}
