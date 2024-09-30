import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler, HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap, tap, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.AuthToken; // Upd// ated reference
    if (accessToken) {
      console.log(accessToken);
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    return next.handle(req).pipe(tap({
      error: (x) => {
        const header: Headers = x.headers;
        if (header.get("Token-expired") === "true") {
          this.authService.refresh().subscribe({
            next: (x => {
              req = req.clone({
                setHeaders: {
                  authorization: `Bearer ${x.token}`
                }
              });
              next.handle(req);
            })
          })
        }
      }
    }));
    ;
  }
}
