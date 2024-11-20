import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-admin',
    imports: [],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss'
})
export class AdminComponent {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  checkUpdates() {
    this.http.post(this.apiUrl+"/api/admin/start-scraping","",).subscribe(
    )
  }
  downloadAllImages() {
    this.http.post(this.apiUrl+"/api/admin/downloadImages","",).subscribe(
    )
  }
}
