import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {NgxMasonryModule} from "ngx-masonry";
import {RouterLink} from "@angular/router";
import {ConfigurationService} from "../../configuration.service";
import {AuthImagePipe} from "../../auth-image.pipe";

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

  constructor(protected config: ConfigurationService) {
  }

}
