import {Pipe, PipeTransform} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {AuthService} from "./_service/auth.service";
import {map, Observable, switchMap} from "rxjs";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Pipe({
  name: 'authImage',
  standalone: true
})
export class AuthImagePipe implements PipeTransform {
  constructor(private http: HttpClient, private authService: AuthService, private sanitizer: DomSanitizer) {
  }

  transform(url: string): Observable<SafeUrl> {
    return this.http
      .get(url, {responseType: 'blob'}).pipe(map(x => {
        return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(x))
      }))

  }


}
