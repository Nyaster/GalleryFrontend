import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigurationService} from "../../configuration.service";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  private apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigurationService) {
    this.apiUrl = config.apiUrl;
  }

  checkUpdates() {
    this.http.post(this.apiUrl+"/api/admin/start-scraping","",).subscribe(

    )
  }
}
