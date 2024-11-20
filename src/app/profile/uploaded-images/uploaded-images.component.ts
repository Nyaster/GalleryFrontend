import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppImageDto} from "../../images/image.service";
import {environment} from "../../../environments/environment";
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-uploaded-images',
    imports: [
        DatePipe,
        RouterLink
    ],
    templateUrl: './uploaded-images.component.html',
    styleUrl: './uploaded-images.component.scss'
})
export class UploadedImagesComponent implements OnInit {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + "/api/user/images";
  }

  protected images!: AppImageDto[];

  ngOnInit(): void {
    this.http.get<AppImageDto[]>(this.apiUrl).subscribe(images => {
      this.images = images;
      console.log(images);
    })
  }
}
