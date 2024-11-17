import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {NgxMasonryModule} from "ngx-masonry";
import {RouterLink} from "@angular/router";
import {AuthImagePipe} from "../../auth-image.pipe";
import {environment} from "../../../environments/environment";
import {ImageTempGeneratorService} from "../image-temp-generator.service";

@Component({
  selector: 'app-image-card',
  standalone: true,
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
  @Input() image: any;
  @Output() imageLoaded = new EventEmitter();

  constructor(private imageTempGen: ImageTempGeneratorService) {

  }
  protected readonly environment = environment;
}
