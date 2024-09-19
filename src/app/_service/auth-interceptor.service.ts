import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.AuthToken; // Updated reference
    if (accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 401) {
          console.log("send a refresh");
          return this.authService.refresh().pipe(
            switchMap(() => {
              const newAccessToken = this.authService.AuthToken; // Updated reference
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`
                },
              });
              return next.handle(req);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
