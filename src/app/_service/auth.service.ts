import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {LoginModel} from "../_interfaces/login.model";
import {Authorization} from "../_interfaces/Authorization.model";
import {catchError, map, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {ConfigurationService} from "../configuration.service";
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  private apiUrl = "http://localhost:5100";
  private _isLoggedIn = false;
  private token: string | null = null;
  private role: string[] | string | null = null;

  constructor(private http: HttpClient, private router: Router, private configuration: ConfigurationService) {
    this.apiUrl = configuration.apiUrl;
    this.loadTokenFromStorage();
  }

  private loadTokenFromStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
      this.decodeToken();
    }
  }

  login(login: LoginModel) {
    return this.http.post<Authorization>(`${this.apiUrl}/api/auth/login`, login)
      .pipe(tap((response) => {
        this.setTokens(response.token, response.refreshToken);
        this.isLoggedIn = true;
        this.loadTokenFromStorage();
      }), catchError((error: HttpErrorResponse) => {
        // Handle the error and rethrow it
        console.error("Login failed in authService:", error);
        return throwError(() => error); // Rethrow the error to be caught by the calling code
      }));
  }

  register(login: LoginModel) {
    return this.http.post<Authorization>(`${this.apiUrl}/api/auth/register`, login)
      .pipe(tap((response) => {
        this.setTokens(response.token, response.refreshToken);
        this.isLoggedIn = true;
        this.loadTokenFromStorage();
      }), catchError(err => {
        return []
      }));
  }

  private decodeToken() {
    if (this.token) {
      const decodedToken = jwt_decode.jwtDecode(this.token);
      const jsonToken = JSON.parse(JSON.stringify(decodedToken));
      const temp: any = jsonToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      this.role = temp;
    }
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

  isAdmin(): boolean {
    console.log(this.role)
    const type = typeof this.role;
    return type === "string" ? this.role === 'Admin' :
      (this.role as string[]).find(x => x === 'Admin') === 'Admin';
  }

  get AuthToken(): string | null {
    return localStorage.getItem("token");
  }

  get RefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  }
}
