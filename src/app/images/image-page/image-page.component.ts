import {Component, Input, input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {map} from "rxjs";
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {AppImageDto, ImageService} from "../image.service";
import {ConfigurationService} from "../../configuration.service";
import {AuthImagePipe} from "../../auth-image.pipe";

@Component({
  selector: 'app-image-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    AuthImagePipe,
    AsyncPipe
  ],
  templateUrl: './image-page.component.html',
  styleUrl: './image-page.component.scss'
})
export class ImagePageComponent implements OnInit {
  id!: number | null;
  @Input() currentImage!: AppImageDto;

  constructor(private route: ActivatedRoute, private router: Router, protected config: ConfigurationService, private imageService: ImageService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get("id"));
      if (this.currentImage === undefined) {
        this.imageService.getImageInfo(this.id).subscribe(image => {
          this.currentImage = image;
        });
      }

    })
  }

}
