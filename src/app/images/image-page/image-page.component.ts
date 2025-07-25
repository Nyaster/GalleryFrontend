import {Component, input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AsyncPipe, DatePipe} from "@angular/common";
import {AppImageDto, ImageService} from "../image.service";
import {AuthImagePipe} from "../../auth-image.pipe";
import {environment} from "../../../environments/environment";
import {ImageRecommendationComponent} from "../../image-recommendation/image-recommendation.component";

@Component({
  imports: [
    RouterLink,
    AuthImagePipe,
    AsyncPipe,
    DatePipe,
    ImageRecommendationComponent,
  ],
  selector: 'app-image-page',
  styleUrl: './image-page.component.scss',
  templateUrl: './image-page.component.html'
})
export class ImagePageComponent implements OnInit {
  id!: number;
  currentImageFromAbove = input<AppImageDto>();
  currentImage!: AppImageDto;
  public url!: string;

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
    route.url.subscribe(url => {
      this.url = url[0].path;
    });
  }

  ngOnInit(): void {

  }

  protected readonly environment = environment;
}
