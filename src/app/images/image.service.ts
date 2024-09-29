import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConfigurationService} from "../configuration.service";

export interface AppImageDto {
  id: number;
  uploadedBy: string;
  uploadedDate: string;
  urlToImage: string;
  width: number;
  height: number;
  tags: string[];
}

interface PageableImageDto {
  page: number;
  pageSize: number;
  orderBy: string;
  images: AppImageDto[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiImagesEndpoint: string;
  private images: AppImageDto[] = [];

  constructor(private http: HttpClient, private config: ConfigurationService) {
    this.apiImagesEndpoint = config.apiUrl + '/api/images/'
  }

  getImages(tags: string[], orderBy: string, page: number, pageSize: number): Observable<PageableImageDto> {
    let params = new HttpParams()
      .set("page", page)
      .set("pageSize", pageSize)
      .set("orderBy", orderBy);
    tags.forEach(tag => {
      params = params.append("tags", tag);
    })
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Ensure that Content-Type is set correctly
    })
    return this.http.get<PageableImageDto>(this.apiImagesEndpoint + 'search/', {params, headers});
  }

  getImageInfo(id: number): Observable<AppImageDto> {
    return this.http.get<AppImageDto>(this.apiImagesEndpoint + id);
  }

}
