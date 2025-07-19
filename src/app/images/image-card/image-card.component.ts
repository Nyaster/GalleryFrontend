import {Component, input, output} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {NgxMasonryModule} from "ngx-masonry";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AuthImagePipe} from "../../auth-image.pipe";
import {environment} from "../../../environments/environment";
import {AppImageDto} from "../image.service";

@Component({
    selector: 'app-image-card',
    imports: [

        NgxMasonryModule,
        RouterLink,
        AuthImagePipe,
        AsyncPipe
    ],
    templateUrl: './image-card.component.html',
    styleUrl: './image-card.component.scss'
})
export class ImageCardComponent {
  readonly image = input.required<AppImageDto>();
  readonly imageLoaded = output();
  public url!: string;

  constructor(activeRoute: ActivatedRoute) {
    activeRoute.url.subscribe(url => {
      this.url = url[0].path;
    })
  }
  protected readonly environment = environment;
}
