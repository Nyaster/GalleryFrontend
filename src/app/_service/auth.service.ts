import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {LoginModel} from "../_interfaces/login.model";
import {Authorization} from "../_interfaces/Authorization.model";
import {catchError, map, tap} from "rxjs";
import {Router} from "@angular/router";
import {ConfigurationService} from "../configuration.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  private apiUrl = "http://localhost:5100";
  private _isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router, private configuration: ConfigurationService) {
    this.apiUrl = configuration.apiUrl;
  }

  login(login: LoginModel) {
    return this.http.post<Authorization>(`${this.apiUrl}/api/auth/login`, login)
      .pipe(tap((response) => {
        this.setTokens(response.token, response.refreshToken);
        this.isLoggedIn = true;
      }), catchError(err => {
        console.log(err);
        return []
      }));
  }

  register(login: LoginModel) {
    return this.http.post<Authorization>(`${this.apiUrl}/api/auth/register`, login)
      .pipe(tap((response) => {
        this.setTokens(response.token, response.refreshToken);
        this.isLoggedIn = true;
      }), catchError(err => {
        console.log(err);
        return []
      }));
  }

  private setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }


  private clearTokens(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }

  public logout(): void {
    this.clearTokens();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  public refresh() {
    if (localStorage.getItem("refreshToken") == null) {
      this.router.navigate(['/login']);
    }
    const refresh = localStorage.getItem("refreshToken");
    return this.http.post<Authorization>(`${this.apiUrl}/api/auth/refresh`, {RefreshToken: refresh})
      .pipe(tap((response) => {
        this.clearTokens();
        this.setTokens(response.token, response.refreshToken);
        this.isLoggedIn = true;
      }), catchError((error: HttpErrorResponse) => {
        this.logout();
        return [];
      }));
  }

  get isLoggedIn(): boolean {
    if (localStorage.getItem("token") != undefined && localStorage.getItem("refreshToken") != null) {
      this.isLoggedIn = true;
    }
    return this._isLoggedIn;
  }

  get AuthToken(): string | null {
    return localStorage.getItem("token");
  }

  get RefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  }
}
