import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {NgxMasonryModule} from "ngx-masonry";
import {RouterLink} from "@angular/router";
import {ConfigurationService} from "../../configuration.service";
import {config} from "rxjs";

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgxMasonryModule,
    RouterLink
  ],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss'
})
export class ImageCardComponent {
  @Input() image: any;

  constructor(protected config: ConfigurationService) {
  }

}
