import {Pipe, PipeTransform} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {AuthService} from "./_service/auth.service";
import {map, Observable, of, startWith, switchMap} from "rxjs";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {catchError} from "rxjs/operators";
import {ImageTempGeneratorService} from "./images/image-temp-generator.service";

@Pipe({
  name: 'authImage',
  standalone: true
})
export class AuthImagePipe implements PipeTransform {
  constructor(private http: HttpClient, private authService: AuthService, private sanitizer: DomSanitizer, private imageTempGen: ImageTempGeneratorService) {

  }

  transform(url: string, width: number, height: number,): Observable<SafeUrl> {
    const placeholder = this.sanitizer.bypassSecurityTrustUrl(
      this.imageTempGen.generatePlaceHolderImage(width, height)
    );
    return this.http
      .get(url, {responseType: 'blob'})
      .pipe(
        map(blob => {
          const objectUrl = URL.createObjectURL(blob);
          return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
        }),
        catchError(() => of(placeholder)), // Return placeholder on error
        startWith(placeholder),
      );

  }


}
