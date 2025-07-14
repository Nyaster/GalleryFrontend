import {Component, model} from '@angular/core';
import {ThemeService} from "../_service/theme.service";
import {ThemeSettings} from "../_enums/theme-settings";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-footer',
    imports: [
        FormsModule,
    ],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
  protected currentTheme = model<ThemeSettings>(0)
  btnRadio =model<number>(0);
  constructor(private themeService: ThemeService) {
    this.currentTheme.set(themeService.themeSetting());
    themeService.changeTheme();
    this.currentTheme.subscribe((x) => {
      themeService.themeSetting.set(x);
      themeService.changeTheme();
    })
  }

  protected readonly ThemeSettings = ThemeSettings;
}


