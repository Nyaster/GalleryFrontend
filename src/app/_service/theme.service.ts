import {Injectable, signal} from '@angular/core';
import {ThemeSettings} from "../_enums/theme-settings";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private preferDark = signal<boolean>(false);
  public themeSetting = signal<ThemeSettings>(ThemeSettings.system)

  constructor() {
    if (localStorage.getItem("theme")) {
      this.themeSetting.set(this.localStorageSettings());
    }
    var value = window.matchMedia("(prefers-color-scheme: dark)");
    console.log(value);
    this.preferDark.set(value.matches);
  }

  public changeTheme(): void {
    switch (this.themeSetting()) {
      case ThemeSettings.system: {
        if (this.preferDark()) {
          this.setTheme("dark");
        } else {
          this.setTheme("light");
        }
        break;
      }
      case ThemeSettings.dark: {
        this.setTheme("dark");
        break;
      }
      case ThemeSettings.light: {
        this.setTheme("light");
        break;
      }
    }

  }

  private setTheme(string: string): void {
    document.body.setAttribute('data-bs-theme', string);
    localStorage.setItem("theme", string);
  }

  public localStorageSettings(): ThemeSettings {
    if (localStorage.getItem("theme")) {
      const textSetting = localStorage.getItem("theme");
      switch (textSetting) {
        case "dark": {
          return ThemeSettings.dark;
        }
        case "light": {
          return ThemeSettings.light;
        }
        default: {
          return ThemeSettings.system;
        }
      }
    } else {
      return ThemeSettings.system;
    }
  }
}
