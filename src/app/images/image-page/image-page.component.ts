import {Component, input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AsyncPipe, DatePipe, NgOptimizedImage} from "@angular/common";
import {AppImageDto, ImageService} from "../image.service";
import {AuthImagePipe} from "../../auth-image.pipe";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-image-page',
  imports: [
    RouterLink,
    AuthImagePipe,
    AsyncPipe,
    DatePipe
  ],
  templateUrl: './image-page.component.html',
  styleUrl: './image-page.component.scss'
})
export class ImagePageComponent implements OnInit {
  id!: number | null;
  currentImageFromAbove = input<AppImageDto>();
  currentImage!: AppImageDto;

  constructor(private route: ActivatedRoute, private router: Router, private imageService: ImageService) {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get("id"));
      if (this.currentImageFromAbove() === undefined) {
        this.imageService.getImageInfo(this.id).subscribe(image => {
          this.currentImage = image;
        });
      } else {
        // @ts-ignore
        this.currentImage = this.currentImageFromAbove();
      }

    })
  }

  ngOnInit(): void {

  }

  protected readonly environment = environment;
}
