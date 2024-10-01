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
    const accessToken = this.authService.AuthToken; // Обновлённая ссылка
    if (accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(req).pipe(
      tap({
        error: (error) => {
          const header: Headers = error.headers;
          if (header.get("Token-expired") === "true") {
            return this.authService.refresh().pipe(
              switchMap((refreshResponse) => {
                // Обновляем токен в заголовках
                const newToken = refreshResponse.token;
                req = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newToken}`
                  }
                });

                return next.handle(req);
              }),
              catchError((refreshError) => {
                // Обработка ошибок при обновлении токена (например, выход пользователя)
                return throwError(refreshError);
              })
            );
          }

          // Если токен не истек, просто выбрасываем ошибку
          return throwError(error);
        }
      })
    );
  }
}
