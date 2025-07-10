import {Component, input, output} from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {NgxMasonryModule} from "ngx-masonry";
import {RouterLink} from "@angular/router";
import {AuthImagePipe} from "../../auth-image.pipe";
import {environment} from "../../../environments/environment";
import {ImageTempGeneratorService} from "../image-temp-generator.service";
import {AppImageDto} from "../image.service";

@Component({
    selector: 'app-image-card',
    imports: [
        NgOptimizedImage,
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

  constructor() {

  }
  protected readonly environment = environment;
}
