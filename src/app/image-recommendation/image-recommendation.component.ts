import {AfterContentInit, AfterViewInit, Component, input, OnChanges, OnInit, viewChild} from '@angular/core';
import {AppImageDto, ImageService, PageableImageDto} from "../images/image.service";
import {ActivatedRoute} from "@angular/router";
import {ImageCardComponent} from "../images/image-card/image-card.component";
import {NgxMasonryComponent, NgxMasonryModule, NgxMasonryOptions} from "ngx-masonry";

@Component({
  selector: 'app-image-recommendation',
  imports: [
    ImageCardComponent,
    NgxMasonryModule
  ],
  templateUrl: './image-recommendation.component.html',
  styleUrl: './image-recommendation.component.scss'
})
export class ImageRecommendationComponent implements OnInit, OnChanges{
  public Images!: AppImageDto[];
  optionsMasonry: NgxMasonryOptions = {};
  id = input.required<number>();
  readonly masonry = viewChild.required(NgxMasonryComponent);

  public constructor(private imageService: ImageService) {
  }

  ngOnChanges() {
    this.imageService.getImageRecommendation(this.id()).subscribe({
      next: (data) => {
        this.Images = data;
        this.masonry().layout();
      },
      error: (err) => console.error(err),
    });
    this.updateMasonryItems();
  }
  ngOnInit(): void {
    this.imageService.getImageRecommendation(this.id()).subscribe({
      next: (data) => {
        this.Images = data;
      },
      error: (err) => console.error(err)
    })
    this.updateMasonryItems();
  }

  private updateMasonryItems() {
    setTimeout(() => {
      this.masonry().reloadItems();
      this.masonry().layout();
    },100);

  }
}
