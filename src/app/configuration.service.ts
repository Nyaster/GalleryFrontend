import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() {
  }

  public apiUrl: string = "http://localhost:8080";
}
